<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Exception;

class UserController extends Controller
{
    public function liste(){
        $users = User::all();

        return new JsonResponse(['success' => true, 'body' => ['users' => $users],'status' => 200]);
    }

    public function create(Request $request){
        $fields = $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
        ]);

        try{
            $user = new User();
            $user->name = $fields['firstName'];
            $user->email = $fields['lastName'];
            $user->password = "fdgdfg";
            $user->save();
            $users = User::all();
           return new JsonResponse(['success' => true, 'body' => ['users' => $users,$request] ,'message' => "Enregistrement effectuer avec success",'status' => 200]);

        }catch (Exception $e) { 
            return new JsonResponse(['success' => false,'body' => [$fields] ,'message' => 'Erreur lors de l\'enregistrement', 'status' => 400]);                        
        }
    }
}
