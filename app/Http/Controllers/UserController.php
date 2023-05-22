<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Models\VerificationLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \Exception;

class UserController extends Controller
{
    /**
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        VerificationLog::create([
            'attempt_type_id' => array_search('register', VerificationLog::types),
            'is_succeeded' => true,
            'visitor_ip' => request()->ip()
        ]);
        $success = [
            'token' => $user->createToken('MyApp')->accessToken,
            'name' => $user->name
        ];
        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            VerificationLog::create([
                'attempt_type_id' => array_search('login', VerificationLog::types),
                'is_succeeded' => true,
                'visitor_ip' => request()->ip()
            ]);
            $success = [
                'token' => $user->createToken('MyApp')->accessToken,
                'name' => $user->name
            ];
            return $this->sendResponse($success, 'User login successfully.');
        } else {
            VerificationLog::create([
                'attempt_type_id' => array_search('login', VerificationLog::types),
                'is_succeeded' => false,
                'visitor_ip' => request()->ip()
            ]);
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }
    }
}
