<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * the database table used by the model
     *
     * @var string
     */
    protected $table = 'roles';

    /**
     * One to Many relation
     *
     */
    public function users()
    {
        return $this->hasMany('App\Models\User');
    }
}
