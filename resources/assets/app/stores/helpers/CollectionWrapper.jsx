'use strict';

var { Map, List, Iterable, is } = require('immutable');
var _ = require('lodash');

/**
 * @param {function} modelParser
 * @constructor
 */
function CollectionWrapper(modelParser) {
    this._modelParser = modelParser;
    this._emptyModel = this.createModel({});

    /**
     * Actually the collection of all models
     */
    this._collection = List();

    /**
     * This is a Map that contains the current status for each model keyed by id.
     */
    this._statuses = Map([[this._emptyModel.get('id')]]);
}

/**
 * Add class methods
 */
_.extend(CollectionWrapper.prototype, {
    /**
     * @param {Array} collection
     */
    populate(collection) {
        var self = this;
        var statuses = [[this._emptyModel.get('id')]];

        this._collection = List(_.map(collection, function(data) {
            var model = self.createModel(data);
            statuses.push([model.get('id')]);

            return model;
        }));

        this._statuses = Map(statuses);
    },

    /**
     * @param {Array|Iterable} IDs
     */
    getModels(IDs) {
        if (IDs === undefined) {
            return this._collection;
        }

        var arrayIDs;

        if (IDs instanceof Iterable) {
            arrayIDs = IDs.toArray();
        } else if (IDs instanceof Array) {
            arrayIDs = IDs;
        } else {
            throw new TypeError('IDs should be an Array or Immutable.Iterable');
        }

        return (
            IDs.length === 0
                ? []
                : this._collection.filter(function(model) {
                    return arrayIDs.indexOf(model.get('id')) !== -1;
                }).toArray()
        );
    },

    /**
     * @returns {List}
     */
    getStatuses() {
        return this._statuses;
    },

    /**
     * @param {object} data
     * @returns {Map}
     */
    createModel(data) {
        var model = _.clone(data);
        this._modelParser(model);

        return Map(model);
    },

    /**
     * @param {int} id
     * @returns {Map}
     */
    getModel(id) {
        if (!id) {
            return this.getEmptyModel();
        }

        return this._collection.find(function(model) {
            return model.get('id') === id;
        });
    },

    /**
     * @param {number} id
     * @returns {Status}
     */
    getStatus(id) {
        return this._statuses.get(id);
    },

    /**
     * @param {Function} predicate
     * @returns {Map}
     */
    getFirstModel(predicate = null) {
        if (!this._collection.size) {
            return this.getEmptyModel();
        }

        return predicate
            ? this._collection.find(predicate, null, this.getEmptyModel())
            : this._collection.first();
    },

    /**
     * @returns {Map}
     */
    getEmptyModel() {
        return this._emptyModel;
    },

    /**
     * Model is started being saved
     *
     * @param {object} data
     * @param {object} details
     */
    saveModelStart(data, details) {
        var model = this.createModel(data);
        this._statuses = this._statuses.set(model.get('id'));
    },

    /**
     * Model was saved successfully!
     *
     * @param {object} data
     */
    saveModelSuccess(data) {
        var model = this.createModel(data);

        var entry = this._collection.findEntry(function(m) {
            return model.get('id') === m.get('id');
        });

        if (entry) {
            if (!is(entry[1], model)) {
                this._collection = this._collection.set(entry[0], model);
            }
        } else {
            this._collection = this._collection.unshift(model);

            // Reset state for the fictional "Create New" model
            // since the real model has been successfully created
            this._statuses = this._statuses.set(this._emptyModel.get('id'));
        }

        this._statuses = this._statuses.set(model.get('id'));
    },

    /**
     * Model was not saved dut to error
     *
     * @param {object} data
     * @param {object} details
     */
    saveModelError(data, details) {
        var model = this.createModel(data);
        var validation = details.validation;

        if (validation) {
            _.each(validation, function(error, field) {
                validation[field] = { value: model.get(field), error: error };
            });
        }

        this._statuses = this._statuses.set(model.get('id'));
    },

    /**
     * Some of model properties were partially updated
     *
     * @param {int} id
     * @param {object} propsToUpdate
     */
    saveModelPartial(id, propsToUpdate) {
        var entry = this._collection.findEntry(function(m) {
            return id === m.get('id');
        });

        if (entry) {
            var index = entry[0];
            var model = entry[1];
            var updatedModel = model.merge(propsToUpdate);

            if (!is(model, updatedModel)) {
                this._collection = this._collection.set(index, updatedModel);
            }
        }
    },

    /**
     * Delete model
     *
     * @param {int} id
     */
    deleteModel(id) {
        this._collection = this._collection.filter(function(model) {
                return model.get('id') !== id;
            }
        );
    },
});

module.exports = CollectionWrapper;
