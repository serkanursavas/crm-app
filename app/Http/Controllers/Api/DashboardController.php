<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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

        // Latest updated user in last 7 days
        $latestUserUpdated = UserResource::collection(
           User::query()->where('updated_at', '>=', Carbon::now()->subDays(7))->orderBy('updated_at', 'desc')->take(5)->get()
        );

        return [
            'totalUser' => $total,
            'latestUser' => $latest ? new UserResource($latest) : null,
            'latestUserUpdated' => $latestUserUpdated
        ];
    }
}
