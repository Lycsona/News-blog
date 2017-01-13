<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use App\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use App\Repositories\RoleRepository;

class UserController extends Controller
{
    /**
     * The UserRepository instance
     *
     * @var UserRepository
     */
    protected $user;

    /**
     * The RoleRepository instance
     *
     * @var RoleRepository
     */
    protected $role;

    /**
     * Create a new UserController instance
     *
     * @param UserRepository $user
     * @param RoleRepository $role
     */
    public function __construct(
        UserRepository $user,
        RoleRepository $role)
    {
        $this->user = $user;
        $this->role = $role;
    }

    /**
     * Getting User Model
     *
     * @param $id
     * @return Response
     */
    public function getUser($id)
    {
        $user = $this->user->getById($id);

        return response()->json([
            'user' => $user,
        ]);
    }
}
