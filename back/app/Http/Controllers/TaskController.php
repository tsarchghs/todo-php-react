<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskController extends Controller
{
    public function index(){
        $user = Auth::guard('api')->user();
        return $user->tasks;
    }
    public function show($id){
        $user = Auth::guard('api')->user();
        $task = Task::findOrFail($id);
        if ($task->user_id !== $user->id) throw new ModelNotFoundException();
        return response()->json([
            "status" => "success",
            "code" => 200,
            "data" => $task
        ]);
    }
    public function store(Request $request){
        $user = Auth::guard('api')->user();
        $data = $request->all();
        $data["user_id"] = $user->id;
        $task = Task::create($data);
        return response()->json([
            "status" => "success",
            "code" => 200,
            "data" => $task
        ]);   
    }
    public function update(Request $request, $id){
        $user = Auth::guard('api')->user();
        $task = Task::findOrFail($id);
        if ($task->user_id !== $user->id) throw new ModelNotFoundException();
        $task->update($request->all());
        return response()->json([
            "status" => "success",
            "code" => 200,
            "data" => $task
        ]);        
    }
    public function destroy($id){
        $user = Auth::guard('api')->user();
        $task = Task::findOrFail($id);
        if ($task->user_id !== $user->id) throw new ModelNotFoundException();
        $task->delete();
        return response()->json([
            "status" => "success",
            "code" => 200,
            "data" => $task
        ]);
    }
}
