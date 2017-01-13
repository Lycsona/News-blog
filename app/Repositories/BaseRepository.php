<?php

namespace App\Repositories;

abstract class BaseRepository {

    /**
     * The Model instance
     */
    protected $model;

    /**
     * Get number of records
     *
     * @array
     */
    public function getNumber()
    {
        $total = $this->model->count();

        $new = $this->model->whereSeen(0)->count();

        return compact($total, $new);
    }

    /**
     * Destroy a model
     *
     * @param int $id
     * @return void
     */
    public function destroy($id)
    {
        $this->getByID($id)->delete();
    }

    /**
     * Get Model by id
     *
     * @param int $id
     * @return App\Models\Model
     */
    public function getById($id)
    {
        return $this->model->findOrFail($id);
    }

}