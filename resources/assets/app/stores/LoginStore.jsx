'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import User from './helpers/User';
import { LOGIN_USER, USER_DATA } from '../actions/Actions';
import AppDispatcher from '../dispatcher/AppDispatcher';

class UserCollectionStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch (action.type) {
            case LOGIN_USER:

                return state.set(id, new User({
                    id,
                    data: action.data.name
                }));

            case USER_DATA:
                return state;

            // case actionTypes.DELETE_User:
            //     return state.delete(action.id);
            //
            // case actionTypes.EDIT_User:
            //     return state.setIn([action.id, 'text'], action.text);
            //
            // case actionTypes.TOGGLE_ALL_UserS:
            //     const areAllComplete = state.every(User => User.complete);
            //     return state.map(User => User.set('complete', !areAllComplete));
            //
            // case actionTypes.TOGGLE_User:
            //     return state.update(
            //         action.id,
            //         User => User.set('complete', !User.complete),
            //     );

            default:
                return state;
        }
    }
}

export default new UserCollectionStore();