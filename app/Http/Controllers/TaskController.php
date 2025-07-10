<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        // Group tasks by status
        return response()->json([
            'to_do' => Task::where('status', 'to_do')->get(),
            'in_progress' => Task::where('status', 'in_progress')->get(),
            'done' => Task::where('status', 'done')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}
