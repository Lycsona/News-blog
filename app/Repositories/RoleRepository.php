<?php

namespace App\Repositories;

use App\Models\Role;

class RoleRepository {

    /**
     * The Role instance
     *
     * @var Role
     */
    protected $role;

    /**
     * Create a new RoleRepository instance
     *
     * @param Role $role
     * @return void
     */
    public function __construct(Role $role)
    {
        $this->role = $role;
    }

    /**
     * Get all roles
     *
     * @return Illuminate\Support\Collection
     */
    public function all()
    {
        return $this->role->all();
    }

    /**
     * Update role
     *
     * @param array $inputs
     * @return void
     */
    public function update($inputs)
    {
        foreach ($inputs as $key => $value)
        {
            $role = $this->role->where('sluf', $key)->firstOrFail();

            $role->title = $value;

            $role->save();
        }
    }

    /**
     * Get roles collection
     *
     * @param User
     * @return array
     */
    public function getAllSelect()
    {
        $select = $this->all()->pluck('title', 'id');

        return compact('select');
    }
}