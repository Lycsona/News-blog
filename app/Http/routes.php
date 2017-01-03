<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'api/'], function() {
    Route::group(['prefix' => 'v1'], function() {
        // Registration routes...
        Route::post('/auth/login',  array( 'uses' => 'Auth\AuthController@postLogin'));
        Route::post('/auth/register',  array( 'uses' => 'Auth\AuthController@postRegister'));
        Route::get('/auth/logout',  array( 'uses' => 'Auth\AuthController@getLogout'));
    });
    // 404 not found error for any unexisting API routes
    Route::any('{all}', function() {
        abort(404);
    })->where('all', '.*');
});

Route::any('{all}', function() {
    return view('welcome');
})->where('all', '^(?!_debugbar).*$');