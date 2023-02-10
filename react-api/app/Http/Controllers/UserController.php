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
       
        $name = $request->firstName;
        $email = $request->lastName;

        try{
            $user = new User();
            $user->name = $name;
            $user->email = $email;
            $user->password = "tulesaime";
            $user->save();

           return new JsonResponse(['success' => true, 'body' => [$email,$name,$_POST] ,'message' => "Enregistrement effectuer avec success",'status' => 200]);

        }catch (Exception $e) { 
            return new JsonResponse(['success' => false,'body' => [$email,$name,$_POST,$request,$e] ,'message' => 'Erreur lors de l\'enregistrement', 'status' => 400]);                        
        }
    }
}
