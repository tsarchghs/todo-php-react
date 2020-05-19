<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Use App\Task;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
 
Route::group(['middleware' => 'auth:api'], function() {
    Route::resource("tasks","TaskController");
});

Route::get("login","AuthController@get_login");
Route::post("login","AuthController@post_login");