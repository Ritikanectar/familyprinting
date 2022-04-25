<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use App\User;
use Validator;
//use Auth;
use Hash;

class LoginController extends Controller
{
    public function login(Request $request){

      if(Auth::attempt(['username'=>$request->email,'password'=>$request->password])){
            $user = Auth::user();
            $responseArray = [];
            $responseArray['token'] = $user->createToken('MyApp')->accessToken;
            $responseArray['name'] = $user->name;
            $responseArray['email'] = $user->email;
            $responseArray['id'] = $user->id;
            $responseArray['user_type'] = $user->user_type;
            $responseArray['flag'] = TRUE;
            return response()->json($responseArray,200);

      }else{
          return response()->json(['error'=>'Invalid Credentials','flag'=>FALSE],203);
      }
    }

    public function logout(){

      if (Auth::check()) {
         Auth::user()->AauthAcessToken()->delete();
      }
    }

    /*public function signUp(Request $request){
      
      $data = array('flag'=>FALSE,'msg'=>'No Data Found');
      $user = new User;
      $user->role = $request->role;
      $user->name = $request->name;
      $user->is_active = 1;
      $user->email = $request->email;
      $user->password = Hash::make($request->password);
      $res = $user->save();
      if($res){
        $data = array('flag'=>TRUE,'msg'=>'Record Inserted');
      }
      return response()->json(['data'=>$data]);
    }*/
}
