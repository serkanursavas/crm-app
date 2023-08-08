<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Total Number of User
        $total = User::query()->count();

        // Latest User
        $latest = User::query()->latest('created_at')->first();


        return [
            'totalUser' => $total,
            'latestUser' => $latest ? new UserResource($latest) : null,
        ];
    }
}
