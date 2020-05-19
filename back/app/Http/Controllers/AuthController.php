<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public $UNAUTHORIZED_RESPONSE = [
        "status" => "error",
        "message" => "Unauthorized", 
        "code" => 401
    ];

    public function index() {
        return response()->json('Test', 401);
    }
    public function get_login(Request $request){
        $user = Auth::guard('api')->user();
        if ($user) return response()->json([
            "user" => $user,
            "token" => $user->createToken("TodoApp:task")
        ]);
        else return response()->json($this->UNAUTHORIZED_RESPONSE,401);
    }
    public function post_login(Request $request)
    {
        $rules = [
            'email' => 'required', //|exists:users',
            'password'  => 'required'
        ];
        $request->validate($rules);
        $data = [
            'email' => $request->get('email'),
            'password'  =>  $request->get('password'),
        ];
        if(Auth::attempt($data))
        {
            $user = Auth::user();
            // the $user->createToken('appName')->accessToken generates the JWT token that we can use 
            return response()->json([
                'user'  =>  $user, // <- we're sending the user info for frontend usage
                'token' =>  $user->createToken('TodoApp:task')->accessToken // <- token is generated and sent back to the front end
            ]);
        }
        else
        {
            return response()->json($this->UNAUTHORIZED_RESPONSE,401);
        }
    }
}