<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{


    // Fetch User
    public function index(Request $request){

        $search = $request->search;
        $search = ($search == null || $search == "null" || $search == "")? null : $search;

        $users = User::select("full_name","email","roles");
        if(!empty($search)){
            $users = $users->where('roles','=',$search);
        }
        $users = $users->get();

        if($users->isNotEmpty()){
            return response()->json([
                'status' => 1,
                "message" => "success",
                "search" => $search,
                "data" => $users
            ],200);
        }

        return response()->json([
            'status' => 0,
            "message" => "Users Not Found",
        ],200);
        
    }
    

    // Create User
    public function add(Request $request){

        $validator = Validator::make($request->all(),[
            'full_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'roles' => 'required|string'
        ]);

        if($validator->fails()){

            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()->toJson()
            ],200);
        }

        $full_name = $request->full_name;
        $email = $request->email;
        $roles = $request->roles;

        $users = new User;

        $users->full_name = $full_name;
        $users->email = $email;
        $users->roles = $roles;

        $users->save();

        if($users){
            return response()->json([
                'status' => 1,
                "message" => "User created successfully"
            ],200);
        }

        return response()->json([
            'status' => 0,
            "message" => "Oops something went wrong!"
        ],200);



    }



}
