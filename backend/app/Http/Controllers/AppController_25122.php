<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Crypt;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

use GuzzleHttp\Client;

use App;

use App\Models\User;
use App\Models\Event;
use App\Models\eventExec;
use App\Models\WelcomeApp;
use App\Models\registration_app;
use App\Models\Registration;
use App\Models\Product;
use App\Models\ProductApp;
use App\Models\Gallery;
use App\Models\Artwork;
use App\Models\ProductGallery;
use App\Models\ProductDesign;
use App\Models\PreviewApp;
use App\Models\ThankyouApp;
use App\Models\UiElementApp;
use App\Models\PrintProp;
use App\Models\PrintFont;
use App\Models\Orders;
use App\Models\LandingApp;
use App\Models\ProductColors;


require '../vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Maatwebsite\Excel\Facades\Excel;
//use Illuminate\Support\Facades\Input;

use Validator;
//use Auth;
use DB;
use Hash;
use \PDF;

class AppController extends Controller
{

    public function get_event_dd(Request $request){
        
       // $evType = array('1'=>'virtual','2'=>'On Site','3'=>'E-Com'); 
        $apType = array(); $evType = array(); $executive = array();
        $type = DB::select(DB::raw("SHOW COLUMNS FROM fp_event WHERE Field = 'event_type'"))[0]->Type;

        preg_match('/^enum\((.*)\)$/', $type, $matches);
        foreach( explode(',', $matches[1]) as $value ){
          $v = trim( $value, "'" );
          //$evType = array_add($enum, $v, $v);
          $evType[str_replace('-','_',str_replace(' ', '_', $v))] = $v;
        }

        $type = DB::select(DB::raw("SHOW COLUMNS FROM fp_event WHERE Field = 'app_type'"))[0]->Type;
        preg_match('/^enum\((.*)\)$/', $type, $matches);
        foreach( explode(',', $matches[1]) as $value ){
          $v = trim( $value, "'" );
          //$apType = array_add($enum, $v, $v);
          array_push($apType, $v);
        }

        /*$apiURL = 'https://ssapi.shipstation.com';
        $apiKey = 'e1d68769ecdc4f11bc0f518e4a306bc9';
        $apiSecret = '4115b9fbd0d94106b259fe5f7d8c31d2';
        $shipStation = new \LaravelShipStation\ShipStation($apiKey, $apiSecret, $apiURL);
        $stores = $shipStation->stores->get([], $endpoint = '');*/

        $executive = User::select("id","name")->where('user_type',2)->get();

        return response()->json(['ev_type'=>array_filter($evType),'ap_type'=>array_filter($apType),'executive'=>$executive,'flag'=>TRUE],200);
    }

    public function create_event(Request $request){

        $jsonData = $request->data;
        $event = new Event;
        $event->event_type = $jsonData['event_type'];
        $event->app_type = $jsonData['app_type'];
        $event->app_name = $jsonData['app_name'];
        $event->start_datetime = date('Y-m-d H:i:s',strtotime($jsonData['start_date']));
        $event->end_datetime = date('Y-m-d H:i:s',strtotime($jsonData["end_date"]));
        $event->orientation = $jsonData['orientation'];
        $event->event_place = $jsonData['location'];
        $event->client = $jsonData['client'];
       // $event->store_id = $jsonData['stores'];
        $event->order_prefix = $jsonData['order_prefix'];
        $event->created_date = date('Y-m-d H:i:s');
        $event->modified_date = date('Y-m-d H:i:s');
        $event->created_by = $request->uid;
        $event->is_active = 1;
        if($event->save()){

          $eventExe = new eventExec;
          $eventExe->user_id = $jsonData['exec'];
          $eventExe->event_id = $event->event_id;
          $eventExe->save();

          $userMail = User::select('email')->where('id',$jsonData['exec'])->first();
          $to = $userMail['email'];
          
          $mail = new PHPMailer();
          $mail->IsSMTP();
          $mail->Mailer = "smtp";
          //$mail->SMTPDebug  = 2;  
          $mail->SMTPAuth   = TRUE;
          $mail->SMTPSecure = "ssl";
          $mail->Port       = 465;
          $mail->Host       = "smtp.gmail.com";
          $mail->Username   = "contact@nectarinfotel.com";
          $mail->Password   = "brbxpfkqjtzdwzpf";

          $mail->IsSMTP();  // telling the class to use SMTP
          $mail->IsHTML(true);
          $mail->AddAddress($to, "");
          $mail->SetFrom("contact@nectarinfotel.com", "Family Printing");
          $mail->AddReplyTo("contact@nectarinfotel.com", "Family Printing");
          $mail->Subject = "Family Printing Event Created";
          $content = "Hello, <br/><br/> Greetings! You have been invited for the event.<b>Please, <a href='http://fpuat.nectarinfotel.com/#/home/".Crypt::encryptString($eventExe->event_id)."/".Crypt::encryptString($jsonData['exec'])."'>Click here </a> to visit.<br/><br/> Thank You. </b>";
          $mail->MsgHTML($content); 
          $mail->Send();

          return response()->json(['msg'=>'Event created successfully','flag'=>TRUE],200);
        }else{
          return response()->json(['error'=>'Unable to create event','flag'=>FALSE],204);
        }
    }

    public function update_event(Request $request){

        if($request->event_id){
        $jsonData = $request->data;
        $event = Event::where("event_id","=",$request->event_id)->first();
        $event->event_type = $jsonData['event_type'];
        $event->app_type = $jsonData['app_type'];
        $event->app_name = $jsonData['app_name'];
        $event->start_datetime = date('Y-m-d H:i:s',strtotime($jsonData['start_date']));
        $event->end_datetime = date('Y-m-d H:i:s',strtotime($jsonData["end_date"]));
        $event->orientation = $jsonData['orientation'];
        $event->event_place = $jsonData['location'];
        $event->client = $jsonData['client'];
      //  $event->store_id = $jsonData['stores'];
        $event->order_prefix = $jsonData['order_prefix'];
        $event->created_date = date('Y-m-d H:i:s');
        $event->modified_date = date('Y-m-d H:i:s');
        $event->created_by = $request->uid;
        $event->is_active = 1;
        if($event->save()){

          $executiveDel = eventExec::where("event_id","=",$request->event_id)->delete();
          $eventExe = new eventExec;
          $eventExe->user_id = $jsonData['exec'];
          $eventExe->event_id = $request->event_id;
          $eventExe->save();

          $events = Event::select('fp_event.app_name','fp_event.order_prefix','fp_event.event_type','fp_event.event_id','fp_event.start_datetime','fp_event.end_datetime','fp_event.event_place','usrbuild.name as name','fp_event.client as client')
                ->join('fp_event_executive AS usrexe', 'usrexe.event_id', '=', 'fp_event.event_id')
                ->join('users AS usrbuild', 'usrbuild.id', '=', 'fp_event.created_by')
                ->where('fp_event.is_active',1)->orderBy('fp_event.event_id','asc')->get();

          return response()->json(['msg'=>'Event updated successfully','events'=>$events,'flag'=>TRUE],200);
        }
      }
      return response()->json(['error'=>'Unable to update event','flag'=>FALSE],204);
    }

    public function get_events(Request $request){

      $draw = $request->draw? $request->draw:0;
      $row = $request->start? $request->start:0;
      $rowperpage = $request->length? $request->length:9999; // Rows display per page
      $columnIndex = $request->order && $request->order[0]['column']? $request->order[0]['column']:0; // Column index
      $columnName = $request->columns && $request->columns[$columnIndex]['data']? $request->columns[$columnIndex]['data']:''; // Column name
      $columnSortOrder = $request->order && $request->order[0]['dir']? $request->order[0]['dir']:'desc'; // asc or desc
      $searchValue = $request->search && $request->search['value']? $request->search['value']:''; // Search value
      $searchQuery = " ";
      if($searchValue != ''){
         $searchQuery = "(fp_event.app_name like '%".$searchValue."%' or fp_event.event_type like '%".$searchValue."%' or fp_event.end_datetime like '%".$searchValue."%' or fp_event.client like '%".$searchValue."%' or fp_event.start_datetime like'%".$searchValue."%')";
      }

      $orderBy = '';
      switch ($columnName) {
        case 'client':
        case 'event_type':
        case 'start_datetime':
        case 'end_datetime':
        case 'event_place':
          $orderBy = "fp_event.$columnName";
          break;
        case 'builder':
          $orderBy = "usrbuild.name";
          break;
        default:
          $orderBy = 'fp_event.event_id';
          break;
      }

      $event = Event::select('fp_event.app_name','fp_event.order_prefix','fp_event.event_type','fp_event.event_id','fp_event.start_datetime','fp_event.end_datetime','fp_event.event_place','usrbuild.name as name','fp_event.client as client')
                ->join('fp_event_executive AS usrexe', 'usrexe.event_id', '=', 'fp_event.event_id')
                //->join('users AS usrclt', 'usrclt.id', '=', 'usrexe.user_id')
                ->join('users AS usrbuild', 'usrbuild.id', '=', 'fp_event.created_by')
                ->where('fp_event.is_active',1);
       if($searchValue != ''){
        $event = $event->havingRaw($searchQuery);
       }
       $event = $event->skip($row)->take($rowperpage)->orderBy($orderBy,$columnSortOrder)->get();

      $totalRecords = Event::join('fp_event_executive AS usrexe', 'usrexe.event_id', '=', 'fp_event.event_id')
                ->join('users AS usrbuild', 'usrbuild.id', '=', 'fp_event.created_by')
                ->where('fp_event.is_active',1)->count();
      $totalRecordwithFilter = Event::join('fp_event_executive AS usrexe', 'usrexe.event_id', '=', 'fp_event.event_id')
                ->join('users AS usrbuild', 'usrbuild.id', '=', 'fp_event.created_by')
                ->where('fp_event.is_active',1);
       if($searchValue != ''){
        $totalRecordwithFilter = $totalRecordwithFilter->whereRaw($searchQuery);
       }
       $totalRecordwithFilter = $totalRecordwithFilter->count();

       $response = array(
        "draw" => intval($draw),
        "iTotalRecords" => $totalRecords,
        "iTotalDisplayRecords" => $totalRecordwithFilter,
        "aaData" => $event
      );

      return response()->json(['event'=>$response,'col'=>$columnName ,'flag'=>TRUE],200);
    }

    public function export_event(Request $request){
        
      header('Content-Type: text/xlsx; charset=utf-8');  
         header('Content-Disposition: attachment; filename=Event.xlsx');  
         $output = fopen("php://output", "w");  
      fputcsv($output, array('Event Name', 'Client Name', 'Event Type', 'Builder', 'Start Date','End Date ','Location'));  
      
      $event = Event::select('fp_event.app_name','fp_event.client as client','fp_event.event_type','usrbuild.name as name',
                             'fp_event.start_datetime','fp_event.end_datetime','fp_event.event_place')
                ->join('fp_event_executive AS usrexe', 'usrexe.event_id', '=', 'fp_event.event_id')
                ->join('users AS usrbuild', 'usrbuild.id', '=', 'fp_event.created_by')
                ->where('fp_event.is_active',1)->get();
      foreach ($event as $rows) {
        $temp['app_name'] = $rows['app_name'];
        $temp['client'] = $rows['client'];
        $temp['event_type'] = $rows['event_type'];
        $temp['name'] = $rows['name'];
        $temp['start_datetime'] = $rows['start_datetime'];
        $temp['end_datetime'] = $rows['end_datetime'];
        $temp['event_place'] = $rows['event_place'];
        fputcsv($output, $temp);
      }
      fclose($output);
    }

    public function get_event(Request $request){

      $event = array();
      $res = Event::select('fp_event.*',DB::raw('DATE_FORMAT(fp_event.start_datetime, "%Y-%m-%dT%H:%i") AS start_date'),'usrexe.user_id AS exec',DB::raw('DATE_FORMAT(fp_event.end_datetime, "%Y-%m-%dT%H:%i") AS end_datetime','fp_event.order_prefix'))
                ->join('fp_event_executive AS usrexe', 'usrexe.event_id', '=', 'fp_event.event_id')
                //->join('users AS usrclt', 'usrclt.id', '=', 'usrexe.user_id')
                ->join('users AS usrbuild', 'usrbuild.id', '=', 'fp_event.created_by')
                ->where('fp_event.event_id',$request->event_id)->get();
        if($res->count()>0){
          $event = $res->first();
        }
        return response()->json(['event'=>$event,'flag'=>TRUE],200);        
    }

    public function change_status_product(Request $request){
      Product::where('product_id',$request->pid)->update(['is_active'=>$request->status]);
      $products = Product::select('frontview_file','backview_file','name','canvas_front_width','canvas_front_height','canvas_back_width','canvas_back_height','product_id','is_active')->get();
      return response()->json(['msg'=>'Product status changed','products'=>$products,'flag'=>TRUE],200);
    }

    public function delete_event(Request $request){
      if(isset($request->event_id)){
        $eventUpdate = Event::where('event_id',$request->event_id)->update(['is_active'=>0]);
        $event = Event::where('is_active',1)->get();
        return response()->json(['msg'=>'Event deleted successfully','event'=>$event,'flag'=>TRUE],200);
      }else{
        return response()->json(['error'=>'Unable to load event','flag'=>FALSE],204);
      }
    }

    public function create_user(Request $request){

        $jsonData = $request->data;
        $user = new User;
        $user->name = $jsonData['name'];
        $user->user_type = $jsonData['user_type'];
        $user->name = $jsonData['user_name'];
        $user->username = $jsonData['user_name'];
        $user->password = Hash::make($jsonData['password']);
        $user->email = $jsonData['email'];
        $user->location = $jsonData['location'];
        $user->contact = $jsonData['contact'];
        $user->created_at = date('Y-m-d H:i:s');
        $user->updated_at = date('Y-m-d H:i:s');
        $user->created_by = $request->uid;
        $user->is_active = 1;
        if($user->save()){
          return response()->json(['msg'=>'User created successfully','flag'=>TRUE],200);
        }else{
          return response()->json(['error'=>'Unable to create user','flag'=>FALSE],204);
        }
    }

    public function update_user(Request $request){

        $jsonData = $request->data;
        $user = User::where("id","=",$request->user_id)->first();
        //return response()->json(['msg'=>$user,'flag'=>FALSE],200);
        $user->name = $jsonData['name'];
        $user->user_type = $jsonData['user_type'];
        $user->name = $jsonData['name'];
        $user->username = $jsonData['user_name'];
        //$user->password = Hash::make($jsonData['password']);
        $user->email = $jsonData['email'];
        $user->location = $jsonData['location'];
        $user->contact = $jsonData['contact'];
        $user->is_active =$jsonData['status'];
        $user->updated_at = date('Y-m-d H:i:s');
       // $user->created_by = $request->uid;
        if($user->save()){
          $users = User::select('users.*')->get();
           // if($usrRes->count()>0){
           //  $users = $usrRes->first();
           // }
          return response()->json(['msg'=>'User updated successfully', 'users'=>$users ,'flag'=>TRUE],200);
        }else{
          return response()->json(['error'=>'Unable to update user','flag'=>FALSE],204);
        }
    }

    public function get_products(Request $request){
      
      $draw = $request->draw;
      $row = $request->start;
      $rowperpage = $request->length; // Rows display per page
      $columnIndex = $request->order[0]['column']; // Column index
      $columnName = $request->columns[$columnIndex]['data']; // Column name
      $columnSortOrder = $request->order[0]['dir']; // asc or desc
      $searchValue = $request->search['value']; // Search value
      $searchQuery = " ";
      if($searchValue != ''){
         $searchQuery = "(fp_product.name like '%".$searchValue."%' or tp.product like '%".$searchValue."%' or fp_product.canvas_back_width like '%".$searchValue."%' or fp_product.canvas_back_height like'%".$searchValue."%' or fp_product.canvas_front_width like '%".$searchValue."%' or fp_product.canvas_front_height like '%".$searchValue."%')";
      }

      $orderBy = 'fp_product.product_id';
      switch ($columnName) {
        case 'name':
        case 'canvas_front':
        case 'canvas_back':
       // case 'color':
          $orderBy = "fp_product.$columnName";
          break;
        case 'type':
          $orderBy = "tp.product";
          break;
        case 'size':
          $orderBy = "sz.size";
          break;
        default:
          $orderBy = 'fp_product.product_id';
          break;
      }

      $product = Product::select('fp_product.product_id','fp_product.name','fp_product.canvas_front_width','fp_product.canvas_front_height','fp_product.canvas_back_width','fp_product.canvas_back_height','pc.frontview_file','fp_product.backview_file',DB::raw('GROUP_CONCAT(sz.size ORDER BY sz.size) as size'),DB::raw('GROUP_CONCAT(pc.color ORDER BY pc.color) as color'),'tp.product as type','fp_product.other_size as other_size')
                ->leftjoin('fp_product_size AS sz', 'sz.product_id', '=', 'fp_product.product_id')
                ->join('fp_product_type AS tp', 'tp.type_id', '=', 'fp_product.type_id')
                ->join('fp_product_colors AS pc',function($join){
                      $join->on('pc.product_id', '=', 'fp_product.product_id');
                      $join->on('pc.frontview_file','!=',DB::raw("''"));
                  })
                
                ->where('fp_product.is_active',1)->groupBy('fp_product.product_id');
       if($searchValue != ''){
        $product = $product->havingRaw($searchQuery);
       }
      $product = $product->skip($row)->take($rowperpage)->orderBy($orderBy,$columnSortOrder)->get();
      
      $totalRecords = Product::where('fp_product.is_active',1)->count();

      $totalRecordwithFilter = Product::leftJoin('fp_product_size AS sz', 'sz.product_id', '=', 'fp_product.product_id')
                ->join('fp_product_type AS tp', 'tp.type_id', '=', 'fp_product.type_id')
                ->where('fp_product.is_active',1)->groupBy('fp_product.product_id');
       if($searchValue != ''){
        $totalRecordwithFilter = $totalRecordwithFilter->whereRaw($searchQuery);
       }
       $totalRecordwithFilter = $totalRecordwithFilter->count();

       foreach($product as $key=>$value){        
        $product[$key]['size'] = array_unique(explode(',',$product[$key]['size']));
        $product[$key]['color'] = array_unique(explode(',',$product[$key]['color']));
       }

       $response = array(
        "draw" => intval($draw),
        "iTotalRecords" => $totalRecords,
        "iTotalDisplayRecords" => $totalRecordwithFilter,
        "aaData" => $product
      );

      return response()->json(['products'=>$response,'flag'=>TRUE],200);
    }

    public function get_product(Request $request){
      
      $product = array(); $prodColors = array();
      if($request->product_id){
      $productRes = Product::select('fp_product.product_id','fp_product.name','fp_product.type_id','fp_product.color','fp_product.canvas_front_width','fp_product.canvas_front_height','fp_product.canvas_back_width','fp_product.canvas_back_height','fp_product.frontview_file','fp_product.backview_file',DB::raw('GROUP_CONCAT(sz.size ORDER BY sz.size) as size'),'tp.product as type','fp_product.other_size')
                ->leftjoin('fp_product_size AS sz', 'sz.product_id', '=', 'fp_product.product_id')
                ->join('fp_product_type AS tp', 'tp.type_id', '=', 'fp_product.type_id')
                ->where('fp_product.product_id',$request->product_id)->groupBy('fp_product.product_id')->get();
        if($productRes->count()>0){
          $product = $productRes->first();
        }
        $clrRows = ProductColors::select("*")
                     ->where([['product_id','=',$request->product_id],['is_active','=',1]])
                     ->get();
        foreach($clrRows as $rows){
            if($rows['frontview_file']!=''){
              $prodColors[$rows['color']]['front'] = $rows['frontview_file'];
              $prodColors[$rows['color']]['color_name'] = $rows['color_name'];
              $prodColors[$rows['color']]['id'] = $rows['id'];
            }
            if($rows['backview_file']!=''){
              $prodColors[$rows['color']]['back'] = $rows['backview_file'];
              $prodColors[$rows['color']]['color_name'] = $rows['color_name'];
              $prodColors[$rows['color']]['id'] = $rows['id'];
              
            }
        }
      }

      return response()->json(['product'=>$product,'prodColors'=>$prodColors,'flag'=>TRUE],200);
    }

    public function export_product(Request $request){
        
      header('Content-Type: text/xlsx; charset=utf-8');  
         header('Content-Disposition: attachment; filename=product.xlsx');  
         $output = fopen("php://output", "w");  
      fputcsv($output, array('Product Name', 'Product Type', 'Color', 'Size', 'Front Canvas','Back Canvas'));
      $products = Product::select('fp_product.product_id','fp_product.name','fp_product.color','fp_product.canvas_front_width','fp_product.canvas_front_height','fp_product.canvas_back_width','fp_product.canvas_back_height','fp_product.frontview_file','fp_product.backview_file',DB::raw('GROUP_CONCAT(sz.size ORDER BY sz.size) as size'),'tp.product as type','fp_product.other_size')
                ->leftjoin('fp_product_size AS sz', 'sz.product_id', '=', 'fp_product.product_id')
                ->join('fp_product_type AS tp', 'tp.type_id', '=', 'fp_product.type_id')
                ->where('fp_product.is_active',1)->groupBy('fp_product.product_id')->get();

      foreach ($products as $rows) {
        $temp['app_name'] = $rows['name'];
        $temp['type'] = $rows['type'];
        $temp['color'] = $rows['color'];
        $temp['size'] = $rows['size']!=''? $rows['size']:$rows['other_size'];
        $temp['canvas_front'] = $rows['canvas_front_width'].'x'.$rows['canvas_front_height'];
        $temp['canvas_back'] = $rows['canvas_back_width'].'x'.$rows['canvas_back_height'];
        fputcsv($output, $temp);
      }
      fclose($output);
    }

    public function create_product(Request $request){

      $colors = json_decode($request->colors);
      //return response()->json(['msg'=>$colors[0]->color,'file'=>$_FILES,'flag'=>TRUE],200);

      $product = new Product;
      $product->type_id = $request->product_type;
      $product->name = $request->product_name;
     // $product->color = $request->product_color;
      $product->other_size = $request->other_size? $request->other_size:'';
      $product->canvas_front_width = $request->canvas_front_width;
      $product->canvas_front_height = $request->canvas_front_height;
      $product->canvas_back_width = $request->canvas_back_width;
      $product->canvas_back_height = $request->canvas_back_height; 
      $product->created_by = $request->uid;
      $product->created_date = date('Y-m-d H:i:s');
      
      if($product->save()){ 

        $sizes = json_decode($request->product_size);
        foreach ($sizes as $key => $value) {
          if($value==TRUE && $value!=''){
            DB::insert("INSERT INTO fp_product_size (size,product_id,created_by,created_date) VALUES (?,?,?,?)",[$key,$product->product_id,$request->uid,date('Y-m-d H:i:s')]);
          }
        }

        if(isset($_FILES['frontview']) && !empty($_FILES['frontview'])){
            
            $countfiles = count($_FILES['frontview']['name']);
            if (!file_exists('uploads/product/'.$product->product_id)) {
                mkdir('uploads/product/'.$product->product_id, 0777, true);
            }
            for($i=0;$i<$countfiles;$i++){
              $filePath = 'product/'.$product->product_id; 
              $filename = $_FILES['frontview']['name'][$i];

              /*define ('SITE_ROOT', realpath(dirname(__FILE__)));*/
              move_uploaded_file($_FILES['frontview']['tmp_name'][$i],'uploads/'.$filePath.'/front_'.$filename);
              $productClr = new ProductColors;
              $productClr->product_id = $product->product_id;
              $productClr->color = !empty($colors)? $colors[$i]->color:'';
              $productClr->color_name = !empty($colors)? $colors[$i]->color_name:'';
              $productClr->frontview_file = $filePath.'/front_'.$filename;
              $productClr->frontview_file_ext = $_FILES['frontview']['type'][$i];
              $productClr->created_by = $request->uid;
              $productClr->created_date = date('Y-m-d H:i:s');
              $productClr->save();
           }

           /* foreach($_FILES['frontview']['tmp_name'] as $files){
                $file = $files;
                $ext = \File::extension($file->getClientOriginalName());
                $filePath = 'product/'.$product->product_id;
                Storage::disk('public_uploads')->putFileAs($filePath, $file, 'front_'.$file->getClientOriginalName());
                
                $productClr = new ProductColors;
                $productClr->product_id = $product->product_id;
                $productClr->frontview_file = $filePath.'/front_'.$file->getClientOriginalName();
                $productClr->frontview_file_ext = $ext;
                $productClr->created_by = $request->uid;
                $productClr->created_date = date('Y-m-d H:i:s');
                $product->save();
            }*/
            
          }

          if(isset($_FILES['backview']) && !empty($_FILES['backview'])){

              $countfiles = count($_FILES['backview']['name']);
              if (!file_exists('uploads/product/'.$product->product_id)) {
                  mkdir('uploads/product/'.$product->product_id, 0777, true);
              }
              for($i=0;$i<$countfiles;$i++){
                $filePath = 'product/'.$product->product_id; 
                $filename = $_FILES['backview']['name'][$i];
                move_uploaded_file($_FILES['backview']['tmp_name'][$i],'uploads/'.$filePath.'/back_'.$filename);
                $productClr = new ProductColors;
                $productClr->product_id = $product->product_id;
                $productClr->color = !empty($colors)? $colors[$i]->color:'';
                $productClr->color_name = !empty($colors)? $colors[$i]->color_name:'';
                $productClr->backview_file = $filePath.'/back_'.$filename;
                $productClr->backview_file_ext = $_FILES['backview']['type'][$i];
                $productClr->created_by = $request->uid;
                $productClr->created_date = date('Y-m-d H:i:s');
                $productClr->save();
             }
          }


          /*if(isset($_FILES['backview']) && !empty($_FILES['backview'])){

            $file = $request->file('backview');
            $ext = \File::extension($file->getClientOriginalName());
            $filePath = 'product/'.$product->product_id;
            Storage::disk('public_uploads')->putFileAs($filePath, $file, 'back_'.$file->getClientOriginalName());
            
            Product::where('product_id', $product->product_id)
                ->update([
                    'backview_file' => $filePath.'/back_'.$file->getClientOriginalName(),
                    'backview_file_ext' => $ext
                  ]);
          }*/

          return response()->json(['msg'=>'Product created successfully','flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'Unable to create product','flag'=>FALSE],204);
    }

    public function update_product(Request $request){

      //return response()->json(['error'=>$_FILES,'flag'=>FALSE],200);
      
      $product = Product::where('product_id','=',$request->product_id)->first();

      $product->type_id = $request->product_type;
      $product->name = $request->product_name;
      $product->color = $request->product_color;
      $product->other_size = $request->other_size? $request->other_size:'';
      $product->canvas_front_width = $request->canvas_front_width;
      $product->canvas_front_height = $request->canvas_front_height;
      $product->canvas_back_width = $request->canvas_back_width;
      $product->canvas_back_height = $request->canvas_back_height;
      
      if($product->save()){ 

        DB::table('fp_product_size')->where('product_id', $request->product_id)->delete();
        $sizes = json_decode($request->product_size);
        foreach ($sizes as $key => $value) {
          if($value==TRUE && $value!=''){
            DB::insert("INSERT INTO fp_product_size (size,product_id,created_by,created_date) VALUES (?,?,?,?)",[$key,$request->product_id,$request->uid,date('Y-m-d H:i:s')]);
          }
        }

       /* if(isset($_FILES['frontview']) && !empty($_FILES['frontview'])){

            $file = $request->file('frontview');
            $ext = \File::extension($file->getClientOriginalName());
            $filePath = 'product/'.$request->product_id;
            Storage::disk('public_uploads')->putFileAs($filePath, $file, 'front_'.$file->getClientOriginalName());
            
            Product::where('product_id', $request->product_id)
                ->update([
                    'frontview_file' => $filePath.'/front_'.$file->getClientOriginalName(),
                    'frontview_file_ext' => $ext
                  ]);
          }*/

          $colors = json_decode($request->colors);

        //  return response()->json(['error'=>$colors,'flag'=>FALSE],200);

          if(!empty($colors)){
            for($i=0;$i<count($colors);$i++){

              /******* Frontview File ***************/

              if(isset($_FILES['frontview']['name'][$i])){
                  $filePath = 'product/'.$product->product_id; 
                  $filename = $_FILES['frontview']['name'][$i];
                  move_uploaded_file($_FILES['frontview']['tmp_name'][$i],'uploads/'.$filePath.'/front_'.$filename);
                  
                  $pclr = ProductColors::where([['product_id','=',$request->product_id],['frontview_file','!=',''],['is_active','=',1]])->get();
                  $count = $pclr->count();
                  
                  if($count>$i){
                    $k=0;
                    foreach($pclr as $rows){
                      if($k==$i){
                        $id = $rows['id'];
                      }
                      $k++;
                    }
                    $productClr = ProductColors::where('id','=',$id)->first();
                    $productClr->color = !empty($colors)? $colors[$i]->color:'';
                    $productClr->color_name = !empty($colors)? $colors[$i]->color_name:'';
                    $productClr->frontview_file = $filePath.'/front_'.$filename;
                    $productClr->frontview_file_ext = $_FILES['frontview']['type'][$i];
                    $productClr->save();
                  }else{
                    $productClr = new ProductColors;
                    $productClr->product_id = $product->product_id;
                    $productClr->color = !empty($colors)? $colors[$i]->color:'';
                    $productClr->color_name = !empty($colors)? $colors[$i]->color_name:'';
                    $productClr->frontview_file = $filePath.'/front_'.$filename;
                    $productClr->frontview_file_ext = $_FILES['frontview']['type'][$i];
                    $productClr->created_by = $request->uid;
                    $productClr->created_date = date('Y-m-d H:i:s');
                    $productClr->save();
                  }
              }else{
                    $pclr = ProductColors::where([['product_id','=',$request->product_id],['frontview_file','!=',''],['is_active','=',1]])->get();
                    $count = $pclr->count();
                    $k=0;
                    foreach($pclr as $rows){
                      if($k==$i){
                        $id = $rows['id'];
                      }
                      $k++;
                    }
                    $productClr = ProductColors::where('id','=',$id)->first();
                    $productClr->color = !empty($colors)? $colors[$i]->color:'';
                    $productClr->color_name = !empty($colors)? $colors[$i]->color_name:'';
                    $productClr->save();
              }

              /******* Backview File ***************/
              if(isset($_FILES['backview']['name'][$i])){
                  $filePath = 'product/'.$product->product_id; 
                  $filename = $_FILES['backview']['name'][$i];
                  move_uploaded_file($_FILES['backview']['tmp_name'][$i],'uploads/'.$filePath.'/back_'.$filename);
                  
                  $pclr = ProductColors::where([['product_id','=',$request->product_id],['backview_file','!=',''],['is_active','=',1]])->get();
                  $count = $pclr->count();
                  
                  if($count>$i){
                    $k=0;
                    foreach($pclr as $rows){
                      if($k==$i){
                        $id = $rows['id'];
                      }
                      $k++;
                    }
                    $productClr = ProductColors::where('id','=',$id)->first();
                    $productClr->color = !empty($colors)? $colors[$i]->color:'';
                    $productClr->color_name = !empty($colors)? $colors[$i]->color_name:'';
                    $productClr->backview_file = $filePath.'/back_'.$filename;
                    $productClr->backview_file_ext = $_FILES['backview']['type'][$i];
                    $productClr->save();
                  }else{
                    $productClr = new ProductColors;
                    $productClr->product_id = $product->product_id;
                    $productClr->color = !empty($colors)? $colors[$i]->color:'';
                    $productClr->color_name = !empty($colors)? $colors[$i]->color_name:'';
                    $productClr->backview_file = $filePath.'/back_'.$filename;
                    $productClr->backview_file_ext = $_FILES['backview']['type'][$i];
                    $productClr->created_by = $request->uid;
                    $productClr->created_date = date('Y-m-d H:i:s');
                    $productClr->save();
                  }
              }else{
                    $pclr = ProductColors::where([['product_id','=',$request->product_id],['backview_file','!=',''],['is_active','=',1]])->get();
                    $count = $pclr->count();
                    $k=0;
                    foreach($pclr as $rows){
                      if($k==$i){
                        $id = $rows['id'];
                      }
                      $k++;
                    }
                    $productClr = ProductColors::where('id','=',$id)->first();
                    $productClr->color = !empty($colors)? $colors[$i]->color:'';
                    $productClr->color_name = !empty($colors)? $colors[$i]->color_name:'';
                    $productClr->save();
              }



            }
          }
          
          $removedProd = json_decode($request->removedProd);
         // return response()->json(['msg'=>'Product updated successfully','test'=>$removedProd,'flag'=>FALSE],200);
          if(!empty($removedProd)){
            foreach($removedProd as $rows){
              if(isset($rows->color)){
                DB::table('fp_product_colors')->where([['color', '=', $rows->color],['product_id','=',$product->product_id]])->delete();
              }
            }
          }

         /* if(isset($_FILES['backview']) && !empty($_FILES['backview'])){

              $countfiles = count($_FILES['backview']['name']);
              if (!file_exists('uploads/product/'.$product->product_id)) {
                  mkdir('uploads/product/'.$product->product_id, 0777, true);
              }
              for($i=0;$i<$countfiles;$i++){
                
             }
          }

          if(isset($_FILES['backview']) && !empty($_FILES['backview'])){

            $file = $request->file('backview');
            $ext = \File::extension($file->getClientOriginalName());
            $filePath = 'product/'.$request->product_id;
            Storage::disk('public_uploads')->putFileAs($filePath, $file, 'back_'.$file->getClientOriginalName());
            
            Product::where('product_id', $request->product_id)
                ->update([
                    'backview_file' => $filePath.'/back_'.$file->getClientOriginalName(),
                    'backview_file_ext' => $ext
                  ]);
          }*/


          $products = Product::select('fp_product.product_id','fp_product.name','fp_product.canvas_front_width','fp_product.canvas_front_height','fp_product.canvas_back_width','fp_product.canvas_back_height','pc.frontview_file','fp_product.backview_file',DB::raw('GROUP_CONCAT(sz.size ORDER BY sz.size) as size'),DB::raw('GROUP_CONCAT(pc.color ORDER BY pc.color) as color'),'tp.product as type','fp_product.other_size as other_size')
                ->leftjoin('fp_product_size AS sz', 'sz.product_id', '=', 'fp_product.product_id')
                ->join('fp_product_type AS tp', 'tp.type_id', '=', 'fp_product.type_id')
                ->join('fp_product_colors AS pc',function($join){
                      $join->on('pc.product_id', '=', 'fp_product.product_id');
                      $join->on('pc.frontview_file','!=',DB::raw("''"));
                  })
                ->where('fp_product.is_active',1)->groupBy('fp_product.product_id')->orderBy('fp_product.name','asc')->get();
            foreach($products as $key=>$value){        
              $products[$key]['size'] = array_unique(explode(',',$products[$key]['size']));
              $products[$key]['color'] = array_unique(explode(',',$products[$key]['color']));
             }
          return response()->json(['msg'=>'Product updated successfully','products'=>$products,'flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'Unable to update product','flag'=>FALSE],204);
    }

    public function add_product_type(Request $request){

      $res = DB::insert('insert into fp_product_type (product, is_active) values (?, ?)', [ $request->product_type_name, 1]);
      $productType = DB::table('fp_product_type')->select('type_id','product')->where('is_active',1)->get();
      return response()->json(['msg'=>'Product type added successfully','product_type'=>$productType,'flag'=>TRUE],200);
    }

    public function remove_product_type(Request $request){
      $res = DB::table('fp_product_type')->where('type_id',$request->product_type)->update(array('is_active'=>0));
      $productType = DB::table('fp_product_type')->select('type_id','product')->where('is_active',1)->get();
      return response()->json(['msg'=>'Product type removed successfully','product_type'=>$productType,'flag'=>TRUE],200);
    }

    public function delete_product(Request $request){
      if(isset($request->product_id)){
        $productUpdate = Product::where('product_id',$request->product_id)->update(['is_active'=>0]);
        $products = Product::select('fp_product.product_id','fp_product.name','fp_product.color','fp_product.canvas_front_width','fp_product.canvas_front_height','fp_product.canvas_back_width','fp_product.canvas_back_height','fp_product.frontview_file','fp_product.backview_file',DB::raw('GROUP_CONCAT(sz.size ORDER BY sz.size) as size'),'tp.product as type','fp_product.other_size as other_size')
                ->leftjoin('fp_product_size AS sz', 'sz.product_id', '=', 'fp_product.product_id')
                ->join('fp_product_type AS tp', 'tp.type_id', '=', 'fp_product.type_id')
                ->where('fp_product.is_active',1)->groupBy('fp_product.product_id')->orderBy('fp_product.name','asc')->get();
        return response()->json(['msg'=>'Product deleted successfully','products'=>$products,'flag'=>TRUE],200);
      }else{
        return response()->json(['error'=>'Unable to load product','flag'=>FALSE],204);
      }
    }

    public function get_users(Request $request){
      

      $draw = $request->draw;
      $row = $request->start;
      $rowperpage = $request->length; // Rows display per page
      $columnIndex = isset($request->order[0])? $request->order[0]['column']:0; // Column index
      $columnName = isset($request->columns[$columnIndex])? $request->columns[$columnIndex]['data']:''; // Column name
      $columnSortOrder = isset($request->order[0])? $request->order[0]['dir']:'asc'; // asc or desc
      $searchValue = isset($request->search['value'])? $request->search['value']:''; // Search value
      $searchQuery = " ";
      if($searchValue != ''){
         $searchQuery = "(users.name like '%".$searchValue."%' or users.email like '%".$searchValue."%' or users.location like '%".$searchValue."%')";
      }

      $orderBy = '';
      switch ($columnName) {
        case 'name':
        case 'email':
        case 'contact':
        case 'location':
          $orderBy = "users.$columnName";
          break;
        case 'type':
          $orderBy = "users.user_type";
          break;
        default:
          $orderBy = 'users.id';
          break;
      }

       $users = User::select('users.*');
       if($searchValue != ''){
        $users = $users->havingRaw($searchQuery);
       }
       $users = $users->skip($row)->take($rowperpage)->orderBy($orderBy,$columnSortOrder)->get();

      $totalRecords = User::count();
      $totalRecordwithFilter = new Event;
       if($searchValue != ''){
        $totalRecordwithFilter = $totalRecordwithFilter->whereRaw($searchQuery);
       }
       $totalRecordwithFilter = $totalRecordwithFilter->count();

       $response = array(
        "draw" => intval($draw),
        "iTotalRecords" => $totalRecords,
        "iTotalDisplayRecords" => $totalRecordwithFilter,
        "aaData" => $users
      );

      return response()->json(['users'=>$response,'col'=>$columnName ,'flag'=>TRUE],200);

      // $users = User::get();
      // return response()->json(['users'=>$users,'flag'=>TRUE],200);
    }

    public function get_user(Request $request){
       $users = array();
       $usrRes = User::select('users.*')->where('id',$request->user_id)->get();
       if($usrRes->count()>0){
        $users = $usrRes->first();
       }
       return response()->json(['user'=>$users,'flag'=>TRUE],200);
    }

    public function deactive_user(Request $request){

     if(isset($request->user_id)){
        $userUpdate = User::where('id',$request->user_id)->update(['is_active'=>0]);
        $users = User::get();
        return response()->json(['msg'=>'User de-activated successfully','users'=>$users,'flag'=>TRUE],200);
      }else{
        return response()->json(['error'=>'Unable to delete user','flag'=>FALSE],204);
      }
    }

    public function get_layout_dd(Request $request){

      $event = array();
      $products = array();
      $selProducts = array();
      $config = array('landing'=>array(),'welcome'=>array(),'reg'=>array(),'product'=>array(),'preview'=>array(),'thankyou'=>array(),'ui'=>array(),'enabledProd'=>array());

      if($request->event_id){

          
          $eventid = $request->event_id;
          $event = Event::select('event_id as id','app_name as name')->where('event_id',$request->event_id)->where('is_active',1)->first();
          $products = Product::select('fp_product.product_id','fp_product.name','fp_product.canvas_front_width','fp_product.canvas_front_height','fp_product.canvas_back_width','fp_product.canvas_back_height','pc.frontview_file','fp_product.backview_file','fp_product.is_active',DB::raw('GROUP_CONCAT(sz.size ORDER BY sz.size) as size'),DB::raw('GROUP_CONCAT(pc.color ORDER BY pc.color) as color'),'tp.product as type','fp_product.other_size as other_size')
                ->leftjoin('fp_product_size AS sz', 'sz.product_id', '=', 'fp_product.product_id')
                ->join('fp_product_type AS tp', 'tp.type_id', '=', 'fp_product.type_id')
                ->join('fp_product_colors AS pc',function($join){
                      $join->on('pc.product_id', '=', 'fp_product.product_id');
                      $join->on('pc.frontview_file','!=',DB::raw("''"));
                  })
                ->where('fp_product.is_active',1)->groupBy('fp_product.product_id')->orderBy('fp_product.name','asc')->get();

          /*Product::select('frontview_file','backview_file','name','canvas_front_width','canvas_front_height','canvas_back_width','canvas_back_height','product_id','is_active')->get();*/

          $selProducts = DB::table('fp_product_selected_app as pas')
          ->select('p.name as product_name','p.product_id','pg.gallery_id as galid','pd.print_location','pd.product_option','pd.gallery_type','pas.app_id')
          ->leftJoin('fp_product as p','p.product_id','=','pas.product_id')
          ->leftJoin('fp_product_app as pa','pa.app_id','=','pas.app_id')
          
          ->leftJoin('fp_product_gallery as pg',function($join) use($eventid){
              $join->on('pg.product_id', '=', 'pas.product_id');
              $join->on('pg.event_id','=',DB::raw("'".$eventid."'"));
          })

          ->leftJoin('fp_product_design as pd',function($join) use($eventid){
              $join->on('pd.product_id', '=', 'pas.product_id');
              $join->on('pd.event_id','=',DB::raw("'".$eventid."'"));
          })

          ->where('pas.is_active',1)->where('pa.event_id',$request->event_id)->groupBy('p.product_id')->get();

          $enabledProd = DB::table('fp_product_selected_app as sp')->select('sp.product_id')
                         ->leftjoin('fp_product_app as pa','pa.app_id','=','sp.app_id')
                         ->where('pa.event_id', $eventid)->get();
          if($enabledProd->count()>0){
            foreach ($enabledProd as $rows) {
                array_push($config['enabledProd'], $rows->product_id);
            }
          }

          $config['landing'] = LandingApp::select('*')->where('event_id',$eventid)->first();
          $config['welcome'] = WelcomeApp::select('*')->where('event_id',$eventid)->first();
          $config['reg'] = registration_app::select('*')->where('event_id',$eventid)->first();
          $config['preview'] = PreviewApp::select('*')->where('event_id',$eventid)->first();
          $config['product'] = ProductApp::select('*')->where('event_id',$eventid)->first();
          $config['thankyou'] = ThankyouApp::select('*')->where('event_id',$eventid)->first();
          $config['ui'] = UiElementApp::select('*')->where('event_id',$eventid)->first();
      }

      return response()->json(['event'=>$event,'products'=>$products,'selProducts'=>$selProducts,'config'=>$config,'flag'=>TRUE],200);
    }

    public function get_prod_dd(Request $request){

      $product_type = DB::table('fp_product_type')->select('type_id','product')->where('is_active',1)->get();
      return response()->json(['product_type'=>$product_type,'flag'=>TRUE],200);
    }

    public function get_app_list(Request $request){

      $draw = $request->draw;
      $row = $request->start;
      $rowperpage = $request->length; // Rows display per page
      $columnIndex = $request->order[0]['column']; // Column index
      $columnName = $request->columns[$columnIndex]['data']; // Column name
      $columnSortOrder = $request->order[0]['dir']; // asc or desc
      $searchValue = $request->search['value']; // Search value
      $searchQuery = " ";
      if($searchValue != ''){
         $searchQuery = "(fp_event.app_name like '%".$searchValue."%' or fp_event.event_type like '%".$searchValue."%' or fp_event.app_type like '%".$searchValue."%' or fp_event.created_date like '%".$searchValue."%' or fp_event.client like '%".$searchValue."%')";
      }

      $orderBy = '';
      switch ($columnName) {
        case 'app_name':
        case 'event_type':
        case 'app_type':
        case 'created_date':
        case 'client':
          $orderBy = "fp_event.$columnName";
          break;
        default:
          $orderBy = 'fp_event.event_id';
          break;
      }
      
      $event = Event::select('fp_event.event_id','fp_event.app_name','fp_event.event_type','fp_event.app_type','fp_event.created_date','fp_event.created_by','fp_event.client as client_name','wl.app_id as wl_id','rg.app_id as rg_id','pr.app_id as pr_id','pd.app_id as pd_id','pv.app_id as pv_id','ty.app_id as ty_id','ui.app_id as ui_id')
                ->leftJoin('fp_welcome_app AS wl','wl.event_id','=','fp_event.event_id')
                ->leftJoin('fp_registration_app AS rg','rg.event_id','=','fp_event.event_id')
                ->leftJoin('fp_product_app AS pr','pr.event_id','=','fp_event.event_id')
                ->leftJoin('fp_product_design AS pd','pd.event_id','=','fp_event.event_id')
                ->leftJoin('fp_preview_app AS pv','pv.event_id','=','fp_event.event_id')
                ->leftJoin('fp_thank_you_app AS ty','ty.event_id','=','fp_event.event_id')
                ->leftJoin('fp_ui_element_app AS ui','ui.event_id','=','fp_event.event_id')
                ->where('fp_event.is_active',1);

      if($searchValue != ''){
        $event = $event->havingRaw($searchQuery);
      }
      $event = $event->skip($row)->take($rowperpage)->orderBy($orderBy,$columnSortOrder)->groupBy('fp_event.event_id')->get();

      foreach ($event as $key=>$rows) {
        $event[$key]['link'] = "https://fpuat.nectarinfotel.com/#/landing/".Crypt::encryptString($rows['event_id'])."/".Crypt::encryptString($rows['created_by']);
      }

      $totalRecords = Event::join('fp_event_executive AS usrexe', 'usrexe.event_id', '=', 'fp_event.event_id')
                ->join('users AS usrbuild', 'usrbuild.id', '=', 'fp_event.created_by')
                ->where('fp_event.is_active',1)->count();
      $totalRecordwithFilter = Event::join('fp_event_executive AS usrexe', 'usrexe.event_id', '=', 'fp_event.event_id')
                ->join('users AS usrbuild', 'usrbuild.id', '=', 'fp_event.created_by')
                ->where('fp_event.is_active',1);
       if($searchValue != ''){
          $totalRecordwithFilter = $totalRecordwithFilter->whereRaw($searchQuery);
       }
       $totalRecordwithFilter = $totalRecordwithFilter->count();

       $response = array(
        "draw" => intval($draw),
        "iTotalRecords" => $totalRecords,
        "iTotalDisplayRecords" => $totalRecordwithFilter,
        "aaData" => $event
      );
      return response()->json(['event'=>$response,'flag'=>TRUE],200);
    }

    public function create_welcome(Request $request){

      $existWelcome = WelcomeApp::where('event_id',$request->event)->get();
      
      if($existWelcome->count()>0){
        
        $eWelcome = $existWelcome[0]['app_id'];
        WelcomeApp::where('app_id', $eWelcome)
          ->where('is_active', 1)
          ->update([
              'event_id' => $request->event,
              'welcome_title' => $request->welcome_title,
              'welcome_desc' => $request->welcome_desc,
              'button_text' => $request->button_text,
              'btn_radius_topleft' => $request->radius_topleft,
              'btn_radius_topright' => $request->radius_topright,
              'btn_radius_botleft' => $request->radius_botleft,
              'btn_radius_botright' => $request->radius_botright,
              'button_bg_color' => $request->btn_bg_color,
              'button_text_color' => $request->btn_text_color
            ]);
        if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

          $file = $request->file('bgimage');
          $ext = \File::extension($file->getClientOriginalName());
          $filePath = 'welcome/'.$eWelcome;
          Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
          
          WelcomeApp::where('app_id', $eWelcome)
              ->where('is_active', 1)
              ->update([
                  'bg_file_path' => $filePath.'/'.$file->getClientOriginalName(),
                  'bg_file_extention' => $ext
                ]);
        }
        return response()->json(['msg'=>'Welcome Layout Updated','flag'=>TRUE],200);

      }else{
        $welcome = new WelcomeApp;
        $welcome->event_id = $request->event;
        $welcome->welcome_title = $request->welcome_title;
        $welcome->welcome_desc = $request->welcome_desc;
        $welcome->button_text = $request->button_text;
        $welcome->btn_radius_topleft = $request->radius_topleft;
        $welcome->btn_radius_topright = $request->radius_topright;
        $welcome->btn_radius_botleft = $request->radius_botleft;
        $welcome->btn_radius_botright = $request->radius_botright;
        $welcome->button_bg_color = $request->btn_bg_color;
        $welcome->button_text_color = $request->btn_text_color;
        $welcome->created_by = $request->uid;
        $welcome->created_date = date('Y-m-d H:i:s');
        $welcome->is_active = 1;
        
        if($welcome->save()){
          if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

            $file = $request->file('bgimage');
            $ext = \File::extension($file->getClientOriginalName());
            $filePath = 'welcome/'.$welcome->app_id;
            Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
            
            WelcomeApp::where('app_id', $welcome->app_id)
                ->where('is_active', 1)
                ->update([
                    'bg_file_path' => $filePath.'/'.$file->getClientOriginalName(),
                    'bg_file_extention' => $ext
                  ]);
          }
          return response()->json(['msg'=>'Welcome Layout Created','flag'=>TRUE],200);
        }
      }
      return response()->json(['msg'=>'Unable to save welcome layouts','flag'=>FALSE],204);
    }

    public function create_landing(Request $request){

      $existLanding = LandingApp::where('event_id',$request->event)->get();
      
      if($existLanding->count()>0){
        
        $eLanding = $existLanding[0]['app_id'];
        LandingApp::where('app_id', $eLanding)
          ->where('is_active', 1)
          ->update([
              'event_id' => $request->event,
              'button_text' => $request->button_text,
              'btn_radius_topleft' => $request->radius_topleft,
              'btn_radius_topright' =>$request->radius_topright,
              'btn_radius_botleft' => $request->radius_botleft,
              'btn_radius_botright' => $request->radius_botright,
              'button_bg_color' => $request->btn_bg_color,
              'button_text_color' => $request->btn_text_color
            ]);
        if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

          $file = $request->file('bgimage');
          $ext = \File::extension($file->getClientOriginalName());
          $filePath = 'landing/'.$eLanding;
          Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
          
          LandingApp::where('app_id', $eLanding)
              ->where('is_active', 1)
              ->update([
                  'bg_file_path' => $filePath.'/'.$file->getClientOriginalName(),
                  'bg_file_extention' => $ext
                ]);
        }
        if(isset($_FILES['logo']) && !empty($_FILES['logo'])){
          $file = $request->file('logo');
          $ext = \File::extension($file->getClientOriginalName());
          $filePath = 'landing/'.$eLanding;
          Storage::disk('public_uploads')->putFileAs($filePath, $file, 'logo_'.$file->getClientOriginalName());
          
          LandingApp::where('app_id', $eLanding)
              ->where('is_active', 1)
              ->update([
                  'logo_file_path' => $filePath.'/logo_'.$file->getClientOriginalName(),
                  'logo_file_extention' => $ext
                ]);
        }
        return response()->json(['msg'=>'Landing Page Layout Updated','flag'=>TRUE],200);

      }else{
        $landing = new LandingApp;
        $landing->event_id = $request->event;
        $landing->button_text = $request->button_text;
        $landing->btn_radius_topleft = $request->radius_topleft;
        $landing->btn_radius_topright = $request->radius_topright;
        $landing->btn_radius_botleft = $request->radius_botleft;
        $landing->btn_radius_botright = $request->radius_botright;
        $landing->button_bg_color = $request->btn_bg_color;
        $landing->button_text_color = $request->btn_text_color;
        $landing->created_by = $request->uid;
        $landing->created_date = date('Y-m-d H:i:s');
        $landing->is_active = 1;
        
        if($landing->save()){
          if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

            $file = $request->file('bgimage');
            $ext = \File::extension($file->getClientOriginalName());
            $filePath = 'landing/'.$landing->app_id;
            Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
            
            LandingApp::where('app_id', $landing->app_id)
                ->where('is_active', 1)
                ->update([
                    'bg_file_path' => $filePath.'/'.$file->getClientOriginalName(),
                    'bg_file_extention' => $ext
                  ]);
          }
          if(isset($_FILES['logo']) && !empty($_FILES['logo'])){
            $file = $request->file('logo');
            $ext = \File::extension($file->getClientOriginalName());
            $filePath = 'landing/'.$landing->app_id;
            Storage::disk('public_uploads')->putFileAs($filePath, $file, 'logo_'.$file->getClientOriginalName());
            
            LandingApp::where('app_id', $landing->app_id)
                ->where('is_active', 1)
                ->update([
                    'logo_file_path' => $filePath.'/logo_'.$file->getClientOriginalName(),
                    'logo_file_extention' => $ext
                  ]);
          }
          return response()->json(['msg'=>'Landing Page Layout Created','flag'=>TRUE],200);
        }
      }
      return response()->json(['msg'=>'Unable to save landing page layouts','flag'=>FALSE],204);
    }

    public function get_welcome_layout(Request $request){

      if(isset($request->event)){
          $data = array();
          $condArray = array('event_id' => $request->event,'is_active' => 1);
          $welcome = WelcomeApp::where($condArray)->get();
          if($welcome->count()>0){
            $data = $welcome->first();
          }
          return response()->json(['msg'=>'Welcome Layout Found','welcome'=>$data,'flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'No data for welcome layout','flag'=>FALSE],204);
    }

    public function create_product_layout(Request $request){

      $existProduct = ProductApp::where('event_id',$request->event)->get();
      
      if($existProduct->count()>0){

        $eProduct = $existProduct[0]['app_id'];
        $productApp = ProductApp::where('app_id',$eProduct)->first();
        $productApp->event_id = $request->event;      
        $productApp->header_text = $request->header_text;

        if($productApp->save()){

            if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){
              $file = $request->file('bgimage');
              $ext = \File::extension($file->getClientOriginalName());
              $filePath = 'productApp/'.$productApp->app_id;
              Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
              ProductApp::where('app_id', $eProduct)
                  ->update([
                    'bg_file_path' => $filePath.'/'.$file->getClientOriginalName(),
                    'bg_file_extention' => $ext
                  ]);
            }

            // DB::table('fp_product_selected_app')->where('app_id',$eProduct)->delete();
            // foreach (json_decode($request->products) as $key => $value) {
            //     DB::table('fp_product_selected_app')->insert(['product_id' => $value, 'app_id' => $eProduct]);
            // }

            //DB::connection()->enableQueryLog();

            if($request->productID && $request->productIDStat){
              if($request->productIDStat=='yes'){
                DB::table('fp_product_selected_app')->insert(['product_id' => $request->productID, 'app_id' => $eProduct]);  
              }else{
                DB::table('fp_product_selected_app')->where('product_id',$request->productID)->where('app_id',$eProduct)->delete();
              }
            }

           // $queries = DB::getQueryLog();
           // return response()->json(['msg'=>end($queries),'enabledProd'=>array(),'flag'=>TRUE],200);

            $enProducts = array();
            $enabledProd = DB::table('fp_product_selected_app')->select('product_id')->where('app_id', $eProduct)->get();
            if($enabledProd->count()>0){
              foreach ($enabledProd as $rows) {
                  array_push($enProducts, $rows->product_id);
              }
            }
            return response()->json(['msg'=>'Product layout updated successfully','enabledProd'=>$enProducts,'flag'=>TRUE],200);
          }
      }else{
        $productApp = new ProductApp;
        $productApp->event_id = $request->event;      
        $productApp->header_text = $request->header_text;
        $productApp->created_by = $request->uid;
        $productApp->created_date = date('Y-m-d H:i:s');
        
        if($productApp->save()){

            if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){
              $file = $request->file('bgimage');
              $ext = \File::extension($file->getClientOriginalName());
              $filePath = 'productApp/'.$productApp->app_id;
              Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
              ProductApp::where('app_id', $productApp->app_id)
                  ->update([
                    'bg_file_path' => $filePath.'/'.$file->getClientOriginalName(),
                    'bg_file_extention' => $ext
                  ]);
            }

            // if($request->products){
            //   foreach (json_decode($request->products) as $key => $value) {
            //       DB::table('fp_product_selected_app')->insert(['product_id' => $value, 'app_id' => $productApp->app_id]);
            //   }
            // }

            if($request->productID && $request->productIDStat){
              if($request->productIDStat=='yes'){
                DB::table('fp_product_selected_app')->insert(['product_id' => $request->productID, 'app_id' => $productApp->app_id]);  
              }else{
                DB::table('fp_product_selected_app')->where('product_id',$request->productID)->where('app_id',$productApp->app_id)->delete();
              }
            }

            $enProducts = array();
            $enabledProd = DB::table('fp_product_selected_app')->select('product_id')->where('app_id', $productApp->app_id)->get();
            if($enabledProd->count()>0){
              foreach ($enabledProd as $rows) {
                  array_push($enProducts, $rows->product_id);
              }
            }
            return response()->json(['msg'=>'Product layout created successfully','enabledProd'=>$enProducts,'flag'=>TRUE],200);
        }
      }
      return response()->json(['msg'=>'Unable to create product layout','flag'=>FALSE],204);
    }

    public function create_registration(Request $request){

        $existedReg = registration_app::where('event_id',$request->event)->get();
        
        if($existedReg->count()>0){
          
          $eapp = $existedReg[0]['app_id'];
          if($request->data_collected==true){

            if(isset($_FILES['import']) && !empty($_FILES['import'])){

              $importCustomer = array();
              $file = fopen($_FILES['import']['tmp_name'], 'r');
              $i=0;
              while (($line = fgetcsv($file)) !== FALSE) {
                if($i!=0){
                  $temp['first_name'] = $line[0];
                  $temp['last_name'] = $line[1];
                  $temp['email'] = $line[2];
                  $temp['contact'] = $line[3];
                  $temp['address_1'] = $line[4];
                  $temp['event_id'] = $request->event;
                  $temp['pre_reg'] = 1;
                  $temp['is_active'] = 1;
                  array_push($importCustomer, $temp);
                }
                $i++;
              }
              fclose($file);
              Registration::insert($importCustomer);
            }

          }

          $updateArr = array(
              'header_title' => $request->header_title,
              'is_terms_conditions' => $request->is_terms=='yes'? 1:0,
              'terms_conditions' => $request->terms_cond? $request->terms_cond:'',
              'data_collected' => ($request->data_collected==false || $request->data_collected=="false")? 0:1,
              'is_first_name' => ($request->first_name==false || $request->first_name=="false")? 0:1,
              'is_last_name' => ($request->last_name==false || $request->last_name=="false")? 0:1,
              'is_phone' => ($request->phone==false || $request->phone=="false")? 0:1,
              'is_email' => ($request->email==false || $request->email=="false")? 0:1,
              'is_address_1' => ($request->address_1==false || $request->address_1=="false")? 0:1,
              'is_address_2' => ($request->address_2==false || $request->address_2=="false")? 0:1,
              'is_city' => ($request->city==false || $request->city=="false")? 0:1,
              'is_zip' => ($request->zip==false || $request->zip=="false")? 0:1,
              'button_color' => $request->button_color,
              'button_text' => $request->button_text,
              'event_id' => $request->event
            );
  //return response()->json(['msg'=>$request->first_name,'flag'=>TRUE],200);      
//          DB::enableQueryLog(); // Enable query log
          registration_app::where('app_id', $eapp)->update($updateArr);
// Your Eloquent query executed by using get()

// return response()->json(['msg'=>DB::getQueryLog(),'flag'=>TRUE],200);

          if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

            $file = $request->file('bgimage');
            $ext = \File::extension($file->getClientOriginalName());
            $filePath = 'registration/'.$eapp;
            Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
            
            registration_app::where('app_id', $eapp)
                ->where('is_active', 1)
                ->update([
                    'bg_file_path' => $filePath.'/'.$file->getClientOriginalName(),
                    'bg_file_extention' => $ext
                  ]);
          }
          return response()->json(['msg'=>'Registration Layout Updated','flag'=>TRUE],200);

        }else{
          $reg = new registration_app;
          $reg->is_terms_conditions = $request->is_terms=='yes'? 1:0;
          $reg->header_title = $request->header_title;
          $reg->terms_conditions = $request->terms_cond? $request->terms_cond:'';
          $reg->data_collected = $request->data_collected==true? 1:0;
          
          if($request->data_collected==true){
             if(isset($_FILES['import']) && !empty($_FILES['import'])){

              $importCustomer = array();
              $file = fopen($_FILES['import']['tmp_name'], 'r');
              $i=0;
              while (($line = fgetcsv($file)) !== FALSE) {
                if($i!=0){
                  $temp['first_name'] = $line[0];
                  $temp['last_name'] = $line[1];
                  $temp['email'] = $line[2];
                  $temp['contact'] = $line[3];
                  $temp['address_1'] = $line[4];
                  $temp['event_id'] = $request->event;
                  $temp['pre_reg'] = 1;
                  $temp['is_active'] = 1;
                  array_push($importCustomer, $temp);
                }
                $i++;
              }
              fclose($file);
              Registration::insert($importCustomer);
            }

          }else{
            $reg->is_first_name = $request->first_name==true? 1:0;
            $reg->is_last_name = $request->last_name==true? 1:0;
            $reg->is_phone = $request->phone==true? 1:0;
            $reg->is_email = $request->email==true? 1:0;
            $reg->is_address_1 = $request->address_1==true? 1:0;
            $reg->is_address_2 = $request->address_2==true? 1:0;
            $reg->is_city = $request->city==true? 1:0;
            $reg->is_zip = $request->zip==true? 1:0;
          }
          
          $reg->button_color = $request->button_color;
          $reg->button_text = $request->button_text;
          $reg->event_id = $request->event;
          $reg->created_by = $request->uid;
          $reg->created_date = date('Y-m-d H:i:s');
          $reg->modified_by = $request->uid;
          $reg->modified_date = date('Y-m-d H:i:s');
          $reg->is_active = 1;
          
          if($reg->save()){
            if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

              $file = $request->file('bgimage');
              $ext = \File::extension($file->getClientOriginalName());
              $filePath = 'registration/'.$reg->app_id;
              Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
              
              registration_app::where('app_id', $reg->app_id)
                  ->where('is_active', 1)
                  ->update([
                      'bg_file_path' => $filePath.'/'.$file->getClientOriginalName(),
                      'bg_file_extention' => $ext
                    ]);
            }
            return response()->json(['msg'=>'Registration Layout Created','flag'=>TRUE],200);
          }
        }
        return response()->json(['msg'=>'Unable to save registration layouts','flag'=>FALSE],204);
    }

    public function create_gallery(Request $request){

      if(!isset($_FILES['bgimage']) || empty($_FILES['bgimage'])){
        return response()->json(['msg'=>'Please Select Gallery Image','flag'=>FALSE],200); 
      }
      $gallery = new Gallery;
      $gallery->title = $request->title;
      $gallery->created_by = $request->uid;
      $gallery->created_date = date('Y-m-d H:i:s');
      $gallery->is_active = 1;
      if($gallery->save()){
        if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

          $file = $request->file('bgimage');
          $ext = \File::extension($file->getClientOriginalName());
          $filePath = 'gallery/'.$gallery->gallery_id;
          Storage::disk('angular_upload')->putFileAs($filePath, $file, $file->getClientOriginalName());
          
          Gallery::where('gallery_id', $gallery->gallery_id)
              ->update([
                  'gallery_image' => $filePath.'/'.$file->getClientOriginalName(),
                  'gallery_image_extension' => $ext
                ]);
        }
        return response()->json(['msg'=>'Gallery created successfully','flag'=>TRUE],200); 
      }
      return response()->json(['msg'=>'Unable to create gallery','flag'=>FALSE],204);
    }

    public function get_gallery(Request $request){

      $gallery = Gallery::where('is_active',1);
      if($request->sort){
        switch ($request->sort) {
          case 'atoz': $gallery->orderBy('title','ASC'); break;
          case 'ztoa': $gallery->orderBy('title','DESC'); break;
          case 'latest': $gallery->orderBy('created_date','DESC'); break;
          case 'oldest': $gallery->orderBy('created_date','ASC'); break;
          default: break;
        }
      }
      $gallery = $gallery->get();
      return response()->json(['gallery'=>$gallery,'flag'=>TRUE],200);
    }

    public function create_artwork(Request $request){

        if(isset($_FILES) && !empty($_FILES)){
          $i=0;
          foreach($_FILES as $file){

              $file = $request->file('clipart_'.$i);
              $ext = \File::extension($file->getClientOriginalName());
              $filePath = 'gallery/'.$request->gallery.'/clipArt';
              Storage::disk('angular_upload')->putFileAs($filePath, $file, $file->getClientOriginalName());
              
              $artwork = new Artwork;
              $artwork->title = $file->getClientOriginalName();
              $artwork->gallery_id = $request->gallery;
              $artwork->artwork_image = $filePath.'/'.$file->getClientOriginalName();
              $artwork->artwork_image_extension = $ext;
              $artwork->created_by = $request->uid;
              $artwork->created_date = date('Y-m-d H:i:s');
              $artwork->is_active = 1;
              $artwork->save();
              $i++;
          }
          return response()->json(['msg'=>'Artwork created successfully','flag'=>TRUE],200);
        }
      return response()->json(['msg'=>'Unable to create artwork','flag'=>FALSE],204);
    }

    public function replace_artwork(Request $request){

        if(isset($_FILES['artwork']) && !empty($_FILES['artwork'])){
          $file = $request->file('artwork');
          $ext = \File::extension($file->getClientOriginalName());
          $filePath = 'gallery/'.$request->gallery.'/clipArt';
          Storage::disk('angular_upload')->putFileAs($filePath, $file, $file->getClientOriginalName());
          
          $artwork = Artwork::where('artwork_id','=',$request->artwork_id)->first();
          $artwork->title = $file->getClientOriginalName();
          $artwork->artwork_image = $filePath.'/'.$file->getClientOriginalName();
          $artwork->artwork_image_extension = $ext;
          $artwork->is_active = 1;
          $artwork->save();
          $cliparts = array();
          if($request->gallery){
            $cliparts = Artwork::where('fp_artwork.is_active',1)->where('fp_artwork.gallery_id',$request->gallery)->get();
          }
          return response()->json(['msg'=>'Artwork replaced successfully','cliparts'=>$cliparts,'flag'=>TRUE],200);
        }
      return response()->json(['msg'=>'Select artwork image to replace','flag'=>FALSE],204);
    }

    public function get_cliparts(Request $request){

      $cliparts = array(); $gallery=array();
      if($request->gallery){
        $cliparts = Artwork::where('fp_artwork.is_active',1)->where('fp_artwork.gallery_id',$request->gallery)->get();
        $gallery = Gallery::where('is_active',1)->where('gallery_id',$request->gallery)->first();
      }
      return response()->json(['cliparts'=>$cliparts,'gallery'=>$gallery,'flag'=>TRUE],200);
    }

    public function delete_cliparts(Request $request){
      $cliparts = array();
      if($request->gallery && $request->id){
        Artwork::where('artwork_id',$request->id)->update(['is_active'=>0]);
        $cliparts = Artwork::where('fp_artwork.is_active',1)->where('fp_artwork.gallery_id',$request->gallery)->get();
      }
      return response()->json(['cliparts'=>$cliparts,'flag'=>TRUE],200);
    }

    public function delete_gallery(Request $request){
      $gallery = array();
      if($request->id){
        Gallery::where('gallery_id',$request->id)->update(['is_active'=>0]);
        $gallery = Gallery::where('is_active',1)->get();
      }
      return response()->json(['gallery'=>$gallery,'flag'=>TRUE],200);
    }

    public function assign_gallery(Request $request){

      $success = array();
      ProductGallery::where('event_id',$request->event)->where('product_id',$request->product)->delete();
      if($request->gallery && !empty(json_decode($request->gallery))){
        foreach (json_decode($request->gallery) as $key => $value) {
            $pGalllery = new ProductGallery;
            $pGalllery->event_id = $request->event;
            $pGalllery->product_id = $request->product;
            $pGalllery->gallery_id = $value;
            $pGalllery->created_by = $request->uid;
            $pGalllery->created_date = date('Y-m-d H:i:s');
            if($pGalllery->save()){
              array_push($success, $pGalllery->id);
            }
        }
        $eventid = $request->event;
        $selProducts = DB::table('fp_product_selected_app as pas')
          ->select('p.name as product_name','p.product_id','pg.gallery_id as galid','pd.print_location','pd.product_option','pd.gallery_type')
          ->leftJoin('fp_product as p','p.product_id','=','pas.product_id')
          ->leftJoin('fp_product_app as pa','pa.app_id','=','pas.app_id')
          ->leftJoin('fp_product_gallery as pg',function($join) use($eventid){
              $join->on('pg.product_id', '=', 'pas.product_id');
              $join->on('pg.event_id','=',DB::raw("'".$eventid."'"));
          })
          ->leftJoin('fp_product_design as pd',function($join) use($eventid){
              $join->on('pd.product_id', '=', 'pas.product_id');
              $join->on('pd.event_id','=',DB::raw("'".$eventid."'"));
          })
          ->where('pas.is_active',1)->where('pa.event_id',$request->event)->groupBy('p.product_id')->get();
        return response()->json(['success'=>$success,'msg'=>'Gallery assigned successfully','selProducts'=>$selProducts,'flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'Unable to assign gallery','flag'=>FALSE],204);
    }

    public function create_product_design(Request $request){

      if (ProductDesign::where([['event_id', '=', $request->event_id],['product_id', '=', $request->productID],['is_active','=',1]])->exists()) {
         ProductDesign::where([['event_id', '=', $request->event_id],['product_id', '=', $request->productID],['is_active','=',1]])
                        ->update(array(
                          'event_id' => $request->event_id,
                          'product_id' => $request->productID,
                          'print_location' => $request->designArea,
                          'product_option' => $request->designScale,
                          'gallery_type' => $request->designGallery
                        ));
          return response()->json(['msg'=>'Product Design Updated','flag'=>TRUE],200);
      }else{
        $prodDesign = new ProductDesign;
        $prodDesign->event_id = $request->event_id;
        $prodDesign->product_id = $request->productID;
        $prodDesign->print_location = $request->designArea;
        $prodDesign->product_option = $request->designScale;
        $prodDesign->gallery_type = $request->designGallery;
        $prodDesign->created_by = $request->uid;
        $prodDesign->created_date = date('Y-m-d H:i:s');
        $prodDesign->is_active = 1;
        if($prodDesign->save()){
          return response()->json(['msg'=>'Product Design Added','flag'=>TRUE],200);
        }
      }
      return response()->json(['msg'=>'Not Exist','flag'=>FALSE],200);
    }

    public function create_preview(Request $request){
       $existPreview = PreviewApp::where('event_id',$request->event)->get();
      
      if($existPreview->count()>0){
        
        $ePreview = $existPreview[0]['app_id'];
        PreviewApp::where('app_id', $ePreview)
          ->where('is_active', 1)
          ->update([
              'event_id' => $request->event,
              'preview' => $request->preview
            ]);
        if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

          $file = $request->file('bgimage');
          $ext = \File::extension($file->getClientOriginalName());
          $filePath = 'preview/'.$ePreview;
          Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
          
          PreviewApp::where('app_id', $ePreview)
              ->where('is_active', 1)
              ->update([
                  'preview_file' => $filePath.'/'.$file->getClientOriginalName(),
                  'preview_file_ext' => $ext
                ]);
        }
        return response()->json(['msg'=>'Welcome Layout Updated','flag'=>TRUE],200);
      }else{
          $preview = new PreviewApp;
          $preview->event_id = $request->event;
          $preview->preview = $request->preview;
          $preview->created_by = $request->uid;
          $preview->created_date = date('Y-m-d H:i:s');
          $preview->is_active = 1;
          
          if($preview->save()){
            if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

              $file = $request->file('bgimage');
              $ext = \File::extension($file->getClientOriginalName());
              $filePath = 'preview/'.$preview->app_id;
              Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
              
              PreviewApp::where('app_id', $preview->app_id)
                  ->where('is_active', 1)
                  ->update([
                      'preview_file' => $filePath.'/'.$file->getClientOriginalName(),
                      'preview_file_ext' => $ext
                    ]);
            }
            return response()->json(['msg'=>'Preview Layout Created','flag'=>TRUE],200);
          }
        }
      return response()->json(['msg'=>'Unable to save preview layout','flag'=>FALSE],204);
    }

    public function create_thankyou(Request $request){

      $existThankyou = ThankyouApp::where('event_id',$request->event)->get();
      
      if($existThankyou->count()>0){
        
        $eThanks = $existThankyou[0]['app_id'];
        ThankyouApp::where('app_id', $eThanks)
          ->where('is_active', 1)
          ->update([
              'event_id' => $request->event,
              'redirect_url' => $request->redirect_url,
              'is_message' => $request->is_message,
              'message' => $request->message,
              'is_pickup_ins' => $request->is_pickup,
              'pickup_ins' => $request->pickup
            ]);
        if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

          $file = $request->file('bgimage');
          $ext = \File::extension($file->getClientOriginalName());
          $filePath = 'thankyou/'.$eThanks;
          Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
          
          ThankyouApp::where('app_id', $eThanks)
              ->where('is_active', 1)
              ->update([
                  'bg_thankyou_file' => $filePath.'/'.$file->getClientOriginalName(),
                  'bg_thankyou_ext' => $ext
                ]);
        }
        return response()->json(['msg'=>'Thank You Layout Updated','flag'=>TRUE],200);
      }else{
          $thanks = new ThankyouApp;
          $thanks->event_id = $request->event;
          $thanks->redirect_url = $request->redirect_url;
          $thanks->is_message = $request->is_message;
          $thanks->message = $request->message;
          $thanks->is_pickup_ins = $request->is_pickup;
          $thanks->pickup_ins = $request->pickup;
          $thanks->created_by = $request->uid;
          $thanks->created_date = date('Y-m-d H:i:s');
          $thanks->is_active = 1;
          
          if($thanks->save()){
            if(isset($_FILES['bgimage']) && !empty($_FILES['bgimage'])){

              $file = $request->file('bgimage');
              $ext = \File::extension($file->getClientOriginalName());
              $filePath = 'thankyou/'.$thanks->app_id;
              Storage::disk('public_uploads')->putFileAs($filePath, $file, $file->getClientOriginalName());
              
              ThankyouApp::where('app_id', $thanks->app_id)
                  ->where('is_active', 1)
                  ->update([
                      'bg_thankyou_file' => $filePath.'/'.$file->getClientOriginalName(),
                      'bg_thankyou_ext' => $ext
                    ]);
            }
            return response()->json(['msg'=>'Thank You Layout Created','flag'=>TRUE],200);
          }
        }
      return response()->json(['msg'=>'Unable to save thank you layout','flag'=>FALSE],204);
    }

    public function create_ui(Request $request){

      $existUI = UiElementApp::where('event_id',$request->event)->get();
      
      if($existUI->count()>0){
        
        $eUI = $existUI[0]['app_id'];
        UiElementApp::where('app_id', $eUI)
          ->where('is_active', 1)
          ->update([
              'event_id' => $request->event,
              'tile_color' => $request->tile_color,
              'btn_text_color' => $request->button_text_color,
              'btn_bg_color' => $request->button_bg_color,
              'popup_box_color' => $request->pop_up_color,
              'sel_highlight' => $request->sel_highlight,
              'body_text_color' => $request->body_text_color,
              'toggled_color' => $request->toggle_color,
              'un_toggled_color' => $request->un_toggle_color,
              'front_back_toggle' => $request->front_back_toggle,
              'header_typeface' => $request->header_typeface
            ]);
        return response()->json(['msg'=>'UI Element Layout Updated','flag'=>TRUE],200);
      }else{
          $UI = new UiElementApp;
          $UI->event_id = $request->event;
          $UI->tile_color = $request->tile_color;
          $UI->btn_text_color = $request->button_text_color;
          $UI->btn_bg_color = $request->button_bg_color;
          $UI->popup_box_color = $request->pop_up_color;
          $UI->sel_highlight = $request->sel_highlight;
          $UI->body_text_color = $request->body_text_color;
          $UI->toggled_color = $request->toggle_color;
          $UI->un_toggled_color = $request->un_toggle_color;
          $UI->front_back_toggle = $request->front_back_toggle;
          $UI->header_typeface = $request->header_typeface;
          $UI->created_by = $request->uid;
          $UI->created_date = date('Y-m-d H:i:s');
          $UI->is_active = 1;
          
          if($UI->save()){
            return response()->json(['msg'=>'UI Element Layout Created','flag'=>TRUE],200);
          }
        }
      return response()->json(['msg'=>'Unable to save UI element layout','flag'=>FALSE],204);
    }

    public function get_order_list(Request $request){

      $draw = $request->draw;
      $row = $request->start;
      $rowperpage = $request->length; // Rows display per page
      $columnIndex = $request->order[0]['column']; // Column index
      $columnName = $request->columns[$columnIndex]['data']; // Column name
      $columnSortOrder = $request->order[0]['dir']; // asc or desc
      $searchValue = $request->search['value']; // Search value
      $searchQuery = " ";
      if($searchValue != ''){
         $searchQuery = "(rg.first_name like '%".$searchValue."%' or rg.last_name like '%".$searchValue."%' or ev.app_name like '%".$searchValue."%' or pd.name like '%".$searchValue."%' or rg.email like '%".$searchValue."%')";
      }

      $orderBy = '';
      switch ($columnName) {
        case 'reciept_id':
        $orderBy = 'fp_orders.created_date'; $columnSortOrder="DESC"; break;
        case 'status':
        case 'created_date':
          $orderBy = "fp_orders.$columnName"; break;
        case 'first_name':
        case 'email':
           $orderBy = "rg.$columnName"; break;
        case 'event_name': $orderBy = "ev.app_name"; break;
        case 'product_name': $orderBy = "pd.name"; break;
        default: $orderBy = 'fp_orders.created_date'; $columnSortOrder="DESC"; break;
      }

      $orders = Orders::select('fp_orders.order_id','fp_orders.status','fp_orders.created_date','rg.first_name','rg.last_name','rg.email','fp_orders.reciept_id','fp_orders.product_color','ev.app_name','pd.name AS product_name','ev.event_id','pd.product_id','rg.reg_id')
                ->leftJoin('fp_registration AS rg','rg.reg_id','=','fp_orders.client_id')
                ->leftJoin('fp_event AS ev','ev.event_id','=','fp_orders.event_id')
                ->leftJoin('fp_product AS pd','pd.product_id','=','fp_orders.product_id')
                ->where('fp_orders.is_active',1);
        if($request->event && $request->event!=''){
          $orders = $orders->where('ev.app_name',$request->event);
        }
        if($searchValue != ''){
          $orders = $orders->havingRaw($searchQuery);
        }
        $orders = $orders->skip($row)->take($rowperpage)->orderBy($orderBy,$columnSortOrder)->groupBy('fp_orders.order_id')->get();
        foreach ($orders as $key => $value) {
          $orders[$key]['event_id'] = Crypt::encryptString($orders[$key]['event_id']);
        }

        $totalRecords = Orders::leftJoin('fp_registration AS rg','rg.reg_id','=','fp_orders.client_id')
                  ->leftJoin('fp_event AS ev','ev.event_id','=','fp_orders.event_id')
                  ->leftJoin('fp_product AS pd','pd.product_id','=','fp_orders.product_id')
                  ->where('fp_orders.is_active',1)->count();
        $totalRecordwithFilter = Orders::leftJoin('fp_registration AS rg','rg.reg_id','=','fp_orders.client_id')
                  ->leftJoin('fp_event AS ev','ev.event_id','=','fp_orders.event_id')
                  ->leftJoin('fp_product AS pd','pd.product_id','=','fp_orders.product_id')
                  ->where('fp_orders.is_active',1);
          if($request->event && $request->event!=''){
            $totalRecordwithFilter = $totalRecordwithFilter->where('ev.app_name',$request->event);
          }
         if($searchValue != ''){
          $totalRecordwithFilter = $totalRecordwithFilter->whereRaw($searchQuery);
         }
         $totalRecordwithFilter = $totalRecordwithFilter->count();

        $response = array(
          "draw" => intval($draw),
          "iTotalRecords" => $totalRecords,
          "iTotalDisplayRecords" => $totalRecordwithFilter,
          "aaData" => $orders
        );
      return response()->json(['orders'=>$response,'flag'=>TRUE],200);
    }

    public function get_design_pdf(Request $request){
      
      /*$data = "Test";
      PDF::loadView('view.pdf', $data, [], [
        'format' => 'A5-L'
      ])->save('/uploads');*/
      $orders = array();
      $data = array('order'=>array(),'reciept_id'=>'new-order');
      if($request->order){

        DB::connection()->enableQueryLog();

        $orders = Orders::select('fp_orders.reciept_id','fp_orders.created_date','rg.first_name','rg.last_name','rg.email','fp_orders.product_color','fp_orders.product_size','ev.app_name','pr.svg','pr.png','pr.view','pd.name as product_name','pc.color_name')

                ->join('fp_print_prop AS pr', function ($join) {
                    $join->on('pr.event_id', '=', 'fp_orders.event_id');
                    $join->on('pr.client_id', '=', 'fp_orders.client_id');
                    $join->on('pr.product_id', '=', 'fp_orders.product_id');
                })

                ->leftJoin('fp_product_colors AS pc',function ($join) {
                    $join->on('pc.product_id', '=', 'fp_orders.product_id');
                    $join->on('pc.color', '=', 'fp_orders.product_color');
                })

                ->leftJoin('fp_registration AS rg','rg.reg_id','=','fp_orders.client_id')
                ->leftJoin('fp_product AS pd','pd.product_id','=','fp_orders.product_id')
                ->leftJoin('fp_event AS ev','ev.event_id','=','fp_orders.event_id')
                ->where([
                        ['fp_orders.order_id','=',$request->order],
                        ['fp_orders.is_active','=',1]
                       ])
                ->groupBy('pr.view')
                ->get();
          if($orders->count()>0){
            $data['order'] = $orders->toArray();
            $data['reciept_id']=$data['order'][0]['reciept_id'];
           /* foreach($data['order'] as $rows){
             \File::put('uploads/test.svg',$rows['svg']);
              $image = new \Imagick();
              $image->readImageBlob(file_get_contents('uploads/test.svg'));
              $image->setImageFormat("png24");
              $image->resizeImage(1024, 768, imagick::FILTER_LANCZOS, 1); 
              $image->writeImage('uploads/test.png');
            }*/
          }
          //var_dump($data['order']);exit();
      }
      $pdf = PDF::loadView('pdf.index-pdf', $data);
      /*$pdf->SetHTMLHeader('<h1>Nilesh</h1>');*/
      return $pdf->download($data['reciept_id'].'.pdf');
    }

    public function get_stores(){

      $apiURL = 'https://ssapi.shipstation.com';
        $apiKey = 'e1d68769ecdc4f11bc0f518e4a306bc9';
        $apiSecret = '4115b9fbd0d94106b259fe5f7d8c31d2';

        $shipStation = new \LaravelShipStation\ShipStation($apiKey, $apiSecret, $apiURL);

        $address = new \LaravelShipStation\Models\Address();

        $address->name = "Joe Campo";
        $address->street1 = "123 Main St";
        $address->city = "Cleveland";
        $address->state = "OH";
        $address->postalCode = "44127";
        $address->country = "US";
        $address->phone = "2165555555";

        $item = new \LaravelShipStation\Models\OrderItem();

        $item->lineItemKey = '1';
        $item->sku = '580123456';
        $item->name = "Awesome sweater.";
        $item->quantity = '1';
        $item->unitPrice  = '29.99';
        $item->warehouseLocation = 'Warehouse A';

        $order = new \LaravelShipStation\Models\Order();

        $order->orderNumber = '1';
        $order->orderDate = '2016-05-09';
        $order->orderStatus = 'awaiting_shipment';
        $order->amountPaid = '29.99';
        $order->taxAmount = '0.00';
        $order->shippingAmount = '0.00';
        $order->internalNotes = 'A note about my order.';
        $order->billTo = $address;
        $order->shipTo = $address;
        $order->items[] = $item;

        // This will var_dump the newly created order, and order should be wrapped in an array.
        var_dump($shipStation->orders->post($order, 'createorder'));
    }

    public function get_order_xml(Request $request){
      
      $data = array('xml'=>array());

//DB::connection()->enableQueryLog();
      if($request->event){
        $orders = Orders::select('fp_orders.order_id','fp_orders.reciept_id','fp_orders.created_date','rg.first_name','rg.last_name','rg.email','rg.contact','rg.address_1','rg.address_2','rg.city','rg.zip','fp_orders.product_color','fp_orders.product_size','pd.name AS product_name','ev.app_name','pd.product_id','rg.reg_id')
                ->leftJoin('fp_registration AS rg','rg.reg_id','=','fp_orders.client_id')
                ->leftJoin('fp_event AS ev','ev.event_id','=','fp_orders.event_id')
                ->leftJoin('fp_product AS pd','pd.product_id','=','fp_orders.product_id')
                ->where('fp_orders.is_active',1);
        if($request->event && $request->event!=''){
          $orders = $orders->where('fp_orders.event_id',$request->event);
        }
        $data['xml'] = $orders->orderBy('fp_orders.order_id','ASC')->groupBy('fp_orders.order_id')->get();   
      }



           // $queries = DB::getQueryLog();
           // print_r($queries); exit();

      /*$customer = Registration::where('reg_id',$request->client)->get()->toArray();
    
      $address->name = ucwords($customer[0]['first_name'].' '.$customer[0]['last_name']);
      $address->street1 = $customer[0]['address_1'];
      $address->city = $customer[0]['city'];
      $address->state = '';
      $address->postalCode = $customer[0]['zip'];
      $address->country = 'US';
      $address->phone = $customer[0]['contact'];

      $product = Product::where('product_id',$request->product)->get()->toArray();
      $item = new \LaravelShipStation\Models\OrderItem();
      $item->lineItemKey = $product[0]['product_id'];
      $item->sku = rand(100000000,999999999);
      $item->name = $product[0]['name'];
      $item->quantity = '1';
      $item->unitPrice  = '0.00';
      $item->warehouseLocation = 'Family Printing Warehouse';

      $order = new \LaravelShipStation\Models\Order();

      $order->orderNumber = '1';
      $order->orderDate = date('Y-m-d');
      $order->orderStatus = 'awaiting_shipment';
      $order->amountPaid = '0.00';
      $order->taxAmount = '0.00';
      $order->shippingAmount = '0.00';
      $order->internalNotes = '';
      $order->billTo = $address;
      $order->shipTo = $address;
      $order->items[] = $item;
      $shipStation->orders->post($order, 'createorder');*/

      return view('admin.orderxml', $data);
    }

}