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
use DB;
use Validator;
//use Auth;
use Hash;

class PublicController extends Controller
{

    public function get_landing_layout(Request $request){

      if(isset($request->event)){
          $data = array();
          $condArray = array('event_id' => Crypt::decryptString($request->event),'is_active' => 1);
          $landing = LandingApp::where($condArray)->get();
          if($landing->count()>0){
            $data = $landing->first();
          }
          return response()->json(['msg'=>'Welcome Layout Found','landing'=>$data,'flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'No data for welcome layout','flag'=>FALSE],204);
    }

    public function get_welcome_layout(Request $request){

      if(isset($request->event)){
          $data = array();
          $condArray = array('event_id' => Crypt::decryptString($request->event),'is_active' => 1);
          $welcome = WelcomeApp::where($condArray)->get();
          if($welcome->count()>0){
            $data = $welcome->first();
          }
          return response()->json(['msg'=>'Welcome Layout Found','welcome'=>$data,'flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'No data for welcome layout','flag'=>FALSE],204);
    }

    public function get_reg_fields(Request $request){
      if(isset($request->event)){
          $data = array();
          $condArray = array('event_id' => Crypt::decryptString($request->event),'is_active' => 1);
          $reg = registration_app::where($condArray)->get();
          if($reg->count()>0){
            $data = $reg->first();
          }
          return response()->json(['msg'=>'Registration Layout Found','reg'=>$data,'flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'No data for registration layout','flag'=>FALSE],204);
    }

     public function get_product_layout(Request $request){

      if(isset($request->event)){
          $productApp = array(); $products = array();
          $condArray = array('event_id' => Crypt::decryptString($request->event),'is_active' => 1);
          $prodApp = ProductApp::where($condArray)->get();
          if($prodApp->count()>0){
            $productApp = $prodApp->first();
            $appid = $productApp->app_id;

            // $products = Product::select('fp_product.product_id','fp_product.name','fp_product.color','fp_product.canvas_front_width','fp_product.canvas_front_height','fp_product.canvas_back_width','fp_product.canvas_back_height','fp_product.frontview_file','fp_product.backview_file',DB::raw('GROUP_CONCAT(sz.size ORDER BY sz.size) as size'),'tp.product as type','fp_product.other_size as other_size')
            //     ->leftjoin('fp_product_size AS sz', 'sz.product_id', '=', 'fp_product.product_id')
            //     ->join('fp_product_type AS tp', 'tp.type_id', '=', 'fp_product.type_id')
            //     ->where('fp_product.is_active',1)->groupBy('fp_product.product_id')->orderBy('fp_product.name','asc')->get();

            $products = Product::select('pc.frontview_file','fp_product.productview_file','fp_product.name','spa.product_id','fp_product.other_size as other_size')
                        ->leftJoin('fp_product_selected_app AS spa','spa.product_id','=','fp_product.product_id')
                        
                        ->leftjoin('fp_product_colors AS pc','pc.product_id','=','fp_product.product_id')
                        ->where('pc.frontview_file', '!=', '')
                        
                        
                        //->leftjoin('fp_product_size AS sz', 'sz.product_id', '=', 'fp_product.product_id')
                        ->where('spa.is_active',1)->where('spa.app_id',$appid)->groupBy('fp_product.product_id')->get();
            if(!empty($products)){
              foreach ($products as $key=>$value) {
                 $products[$key]['other_size'] = $products[$key]['other_size']!=""? explode(",", $value['other_size']):array();
                 $sizeArr = DB::table('fp_product_size AS sz')->select('sz.size')
                 ->where([['product_id','=',$value['product_id']],['is_active','=',1]])->get();
                 $products[$key]['size'] = $sizeArr;
              }
            }
          }
          return response()->json(['msg'=>'Registration Layout Found','productApp'=>$productApp,'products'=>$products,'flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'No data for registration layout','flag'=>FALSE],204);
    }

    public function get_product_property(Request $request){

      $products = array('sizes'=>array(),'colors'=>array(),'productApp'=>array());

      $product = Product::select('fp_product.other_size')
                 ->where('fp_product.product_id',$request->product_id)->get();
      if(!empty($product)){
        $product = $product->first();
        $other_size = $product['other_size']!=""? explode(",", $product['other_size']):array();
        $sizeArr = DB::table('fp_product_size AS sz')->select('sz.size')
           ->where([['product_id','=',$request->product_id],['is_active','=',1]])->get();
        if($sizeArr->count()>0){
          $products['sizes'] = $sizeArr->toArray();
          $products['sizes'] = array_merge(array_column($products['sizes'],'size'),$other_size);
        }else{
          $products['sizes'] = $other_size;
        }
      }

      $colorArr = ProductColors::select('color','color_name','frontview_file')
                 ->where([['product_id','=',$request->product_id],['is_active','=',1],['frontview_file','!=','']])->get();
      $products['colors'] = $colorArr;
      //////////////////////
      $condArray = array('event_id' => Crypt::decryptString($request->event),'is_active' => 1);
      $prodApp = ProductApp::where($condArray)->get();
          if($prodApp->count()>0){
            $products['productApp'] = $prodApp->first();}
      ///////////////////      
      return response()->json(['msg'=>'Details Found','products'=>$products,'flag'=>TRUE],200);
    }

    public function register(Request $request){

      $reg = new Registration;
      $reg->event_id = Crypt::decryptString($request->event);
      $reg->first_name = $request->first_name? $request->first_name:"";
      $reg->last_name = $request->last_name? $request->last_name:"";
      $reg->email = $request->email? $request->email:"";
      $reg->contact = $request->phone? $request->phone:0;
      $reg->address_1 = $request->address_1? $request->address_1:"";
      $reg->address_2 = $request->address_2? $request->address_2:"";
      $reg->city = $request->city? $request->city:"";
      $reg->zip = $request->zip? $request->zip:"";
      $reg->is_active = 1;
      if($reg->save()){
        return response()->json(['msg'=>'Registration completed successfully','reg_id'=>$reg->reg_id,'flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'Registration failed','flag'=>FALSE],204);
    }

    public function get_product_details(Request $request){

      $product = array(); $productProp=array(); $uiElement=array();
      $colorProd = array();
      $frontSvg=""; $backSvg=""; $preview=array();
      if($request->product_id){
        $event_id = Crypt::decryptString($request->event_id);
        $user_id = Crypt::decryptString($request->user_id);
        $client_id = $request->client_id;
       
        $product = Product::where('fp_product.product_id',$request->product_id)->first();
        
        $colorProd = ProductColors::where([
          ['color','=',$request->pColor],
          ['product_id','=',$request->product_id],
          ['is_active','=',1]
        ])->get();

         // Create the dom document as per the other answers
        if($product->frontview_svg!=''){
          $svg = new \DOMDocument();
          $svg->load(public_path('uploads/'.$product->frontview_svg));
          $svg->documentElement->setAttribute("class", 'prodSvg');
          $frontSvg = $svg->saveXML($svg->documentElement);

          $svg = new \DOMDocument();
          $svg->load(public_path('uploads/'.$product->backview_svg));
          $svg->documentElement->setAttribute("class", 'prodSvg');
          $backSvg = $svg->saveXML($svg->documentElement);
        }
        
        $productProp = ProductDesign::where('product_id',$request->product_id)->where('event_id',$event_id)->first();
        $gallery = ProductGallery::select('gal.gallery_image','gal.title','gal.gallery_id')
                      ->leftJoin('fp_gallery as gal','gal.gallery_id','=','fp_product_gallery.gallery_id')
                      ->where("fp_product_gallery.event_id",$event_id)
                      ->where('fp_product_gallery.product_id',$request->product_id)
                      ->where('fp_product_gallery.is_active',1)
                      ->get();
        $uiElement = UiElementApp::where('event_id',$event_id)->first();
        $preview = PreviewApp::where('event_id',$event_id)->first();

        $eventsdata = Event::select('fp_event.app_name')
        ->where('event_id',$event_id)->first();

        $registration = Registration::select('first_name','last_name')
        ->where('reg_id',$client_id)->first();
        
        return response()->json(['product'=>$product,'productProp'=>$productProp,'uiElement'=>$uiElement,'preview'=>$preview,'gallery'=>$gallery,'frontSvg'=>$frontSvg,'backSvg'=>$backSvg,'prod_colors'=>$colorProd,'pid'=>$request->product_id,'eveid'=>$event_id,'registration'=>$registration,'eventData'=>$eventsdata,'flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'No data found','flag'=>FALSE],204);
    }

    public function get_artwork_by_gallery(Request $request){

      if($request->gallery_id){

        $artworks = Artwork::where('gallery_id',$request->gallery_id)->where('is_active',1)->get();
        return response()->json(['artworks'=>$artworks,'flag'=>TRUE],200);
      }
      return response()->json(['msg'=>'No data found','flag'=>FALSE],204);
    }

  public function create_print_prop(Request $request){

    if($request->product_id && !empty($request->product_id)){
      
      if($request->front && !empty($request->front)){
        // echo $request->top_pos_front.' '.$request->left_pos_front.' '.$request->width_pos_front.' '.$request->height_pos_front;
        // die();
         $printApp = new PrintProp;
         $printApp->event_id = Crypt::decryptString($request->event_id);
         $printApp->product_id = $request->product_id;
         $printApp->client_id = $request->client;
         $printApp->created_by = Crypt::decryptString($request->user_id);
         $printApp->created_date = date('Y-m-d H:i:s');
         $printApp->svg = $request->front;
         $printApp->png = $request->front_png;
         $printApp->size = $request->size;
         $printApp->color = $request->color;
         $printApp->view = 'Front';
         $printApp->top_pos_front = $request->top_pos_front;
         $printApp->left_pos_front = $request->left_pos_front;
         $printApp->width_pos_front = $request->width_pos_front;
         $printApp->height_pos_front = $request->height_pos_front;
         $printApp->save();
      }
      if($request->back && !empty($request->back)){
         $printApp = new PrintProp;
         $printApp->event_id = Crypt::decryptString($request->event_id);
         $printApp->product_id = $request->product_id;
         $printApp->client_id = $request->client;
         $printApp->created_by = Crypt::decryptString($request->user_id);
         $printApp->created_date = date('Y-m-d H:i:s');
         $printApp->svg = $request->back;
         $printApp->png = $request->back_png;
         $printApp->size = $request->size;
         $printApp->color = $request->color;
         $printApp->view = 'Back';
         $printApp->top_pos_back = $request->top_pos_back;
         $printApp->left_pos_back = $request->left_pos_back ;
         $printApp->width_pos_back = $request->width_pos_back;
         $printApp->height_pos_back = $request->height_pos_back ;
         $printApp->save();
      }

      if($request->event_id){
        $pageheight = 792;
        $pagewidth = 612; 
        $orientation = 'p';
        $prefix = array('order_prefix'=>'');
        $eventType = '';
        $prefix = Event::select('order_prefix','event_type','pagewidth','pageheight','orientation')
                   ->where([
                      ['event_id', '=', Crypt::decryptString($request->event_id)],
                      ['is_active','=',1]
                  ])->get();
        if($prefix->count()>0){
          $prefix = $prefix->first();
          $eventType = $prefix['event_type'];
          if($prefix['pageheight'] != '' && !empty($prefix['pageheight']) && $prefix['pageheight'] != null){
            $pageheight = $prefix['pageheight']*28.346;
          }
          if($prefix['pagewidth'] != '' && !empty($prefix['pagewidth']) && $prefix['pagewidth'] != null){
            $pagewidth = $prefix['pagewidth']*28.346;
          }
          if($prefix['orientation'] == 'Landscape'){
            $orientation = 'l';
          }
          if($prefix['orientation'] == 'Portrait'){
            $orientation = 'p';
          }

        }
        $recieptNum = $prefix['order_prefix'].'000001';
        $orders = Orders::select('order_id','reciept_id')
                  ->where([['is_active','=',1],['event_id','=',Crypt::decryptString($request->event_id)]])
                  ->orderBy('order_id','desc')->get();
        if($orders->count()>0){
          $order = $orders->first();
          preg_match_all('!\d+!', $order['reciept_id'] , $num);
          $recieptNum = $prefix['order_prefix'].str_pad(++$num[0][0], 6, '0', STR_PAD_LEFT);
        }

        $pdffilename = $recieptNum.time().'.pdf';

        $orders = new Orders;
        $orders->reciept_id = $recieptNum;
        $orders->client_id = $request->client;
        $orders->event_id = Crypt::decryptString($request->event_id);
        $orders->product_id = $request->product_id;
        $orders->product_size = $request->size;
        $orders->product_color = $request->color;
        $orders->canvas_front_width = $request->canvas_front_width;
        $orders->canvas_front_height = $request->canvas_front_height;
        $orders->canvas_back_width = $request->canvas_back_width;
        $orders->canvas_back_height = $request->canvas_back_height;
        $orders->status = 'Ordered';
        $orders->created_by = 1;
        $orders->created_date = date('Y-m-d H:i:s');
        $orders->is_active = 1;
        $orders->pdf_file_name = $pdffilename;
        if($orders->save()){

          if($eventType=='Virtual'){
            $apiURL = 'https://ssapi.shipstation.com';
            $apiKey = 'e1d68769ecdc4f11bc0f518e4a306bc9';
            $apiSecret = '4115b9fbd0d94106b259fe5f7d8c31d2';


            $shipStation = new \LaravelShipStation\ShipStation($apiKey, $apiSecret, $apiURL);

            $customer = Registration::where('reg_id',$request->client)->get()->toArray();
            $address = new \LaravelShipStation\Models\Address();
            $address->name = ucwords($customer[0]['first_name'].' '.$customer[0]['last_name']);
            $address->street1 = $customer[0]['address_1'];
            $address->city = $customer[0]['city'];
            $address->state = '';
            $address->postalCode = $customer[0]['zip'];
            $address->country = 'US';
            $address->phone = $customer[0]['contact'];

            $product = Product::where('product_id',$request->product_id)->get()->toArray();
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
            $shipStation->orders->post($order, 'createorder');
          }
          return response()->json(['msg'=>'Success','orientation'=>$orientation,'pageheight'=>$pageheight,'pagewidth'=>$pagewidth,'orderid'=>$orders->id,'eventType'=>$eventType,'pdffilename'=>$pdffilename,'flag'=>TRUE],200);
        }
      }
      //return response()->json(['msg'=>'Success','flag'=>TRUE],200);
    }
    return response()->json(['msg'=>'Failed','flag'=>FALSE],200);
  }

    public function save_pdf(Request $request){
      
              if(!empty($_FILES['pdf'])) {
                // PDF is located at $_FILES['data']['tmp_name']
                
                $content = file_get_contents($_FILES['pdf']['tmp_name']);
                //echo $content;
                $location = "uploads/pdffiles/";
                $filename = $request->filename;
                move_uploaded_file($_FILES['pdf']['tmp_name'], $location.$filename);
                return response()->json(['msg'=>'Success','flag'=>TRUE],200);
                
                  } else {
                
                return response()->json(['msg'=>'Failed','flag'=>FALSE],200);
                  }
             

    }

  public function create_print_prop_old(Request $request){

    if($request->front['image'] && !empty($request->front['image'])){
      foreach ($request->front['image'] as $key => $value) {
         $printApp = new PrintProp;
         $printApp->event_id = Crypt::decryptString($request->event_id);
         $printApp->product_id = $request->product_id;
         $printApp->client_id = $request->client;
         $printApp->created_by = Crypt::decryptString($request->user_id);
         $printApp->created_date = date('Y-m-d H:i:s');
         $printApp->clipart = $value;
         //return response()->json(['front'=>$request->front,'back'=>$request->back,'flag'=>TRUE],200);
         $printApp->top_pos = $request->front['top'][$key];
         $printApp->left_pos = $request->front["left"][$key];
         $printApp->rotate = $request->front["rotate"][$key];
         $printApp->z_index = $request->front["zindex"][$key];
         $printApp->view = 'Front';
         $printApp->width = $request->front["width"][$key];
         $printApp->height = $request->front["height"][$key];
         $printApp->save();
      }
    }

    if($request->front['text1'] && !empty($request->front['text1'])){
         $printFont = new PrintFont;
         $printFont->event_id = Crypt::decryptString($request->event_id);
         $printFont->product_id = $request->product_id;
         $printFont->client_id = $request->client;
         $printFont->created_by = Crypt::decryptString($request->user_id);
         $printFont->created_date = date('Y-m-d H:i:s');
         $printFont->text = $request->front['text1']['text'];
         $printFont->color = $request->front['text1']['color'];
         $printFont->family = $request->front['text1']['family'];
         $printFont->weight = $request->front['text1']['weight'];
         $printFont->spacing = $request->front['text1']['spacing'];
         $printFont->top_pos = $request->front['text1']['top'];
         $printFont->left_pos = $request->front['text1']['left'];
         $printFont->width = $request->front['text1']['width']? $request->front['text1']['width']:'';
         $printFont->view = 'front';
         $printFont->size = $request->front['text1']['size'];
         $printFont->save();
    }

     if($request->front['text2'] && !empty($request->front['text2'])){
         $printFont = new PrintFont;
         $printFont->event_id = Crypt::decryptString($request->event_id);
         $printFont->product_id = $request->product_id;
         $printFont->client_id = $request->client;
         $printFont->created_by = Crypt::decryptString($request->user_id);
         $printFont->created_date = date('Y-m-d H:i:s');
         $printFont->text = $request->front['text2']['text'];
         $printFont->color = $request->front['text2']['color'];
         $printFont->family = $request->front['text2']['family'];
         $printFont->weight = $request->front['text2']['weight'];
         $printFont->spacing = $request->front['text2']['spacing'];
         $printFont->top_pos = $request->front['text2']['top'];
         $printFont->left_pos = $request->front['text2']['left'];
         $printFont->width = $request->front['text2']['width']? $request->front['text2']['width']:'';
         $printFont->view = 'front';
         $printFont->size = $request->front['text2']['size'];
         $printFont->save();
    }

    if($request->back['image'] && !empty($request->back['image'])){
      foreach ($request->back['image'] as $key => $value) {
         $printApp = new PrintProp;
         $printApp->event_id = Crypt::decryptString($request->event_id);
         $printApp->product_id = $request->product_id;
         $printApp->client_id = $request->client;
         $printApp->created_by = Crypt::decryptString($request->user_id);
         $printApp->created_date = date('Y-m-d H:i:s');
         $printApp->clipart = $value;
         $printApp->top_pos = $request->back['top'][$key];
         $printApp->left_pos = $request->back['left'][$key];
         $printApp->rotate = $request->back['rotate'][$key];
         $printApp->z_index = $request->back['zindex'][$key];
         $printApp->view = 'back';
         $printApp->width = $request->back['width'][$key];
         $printApp->height = $request->back['height'][$key];
         $printApp->save();
      }
    }

    if($request->back['text1'] && !empty($request->back['text1'])){
         $printFont = new PrintFont;
         $printFont->event_id = Crypt::decryptString($request->event_id);
         $printFont->product_id = $request->product_id;
         $printFont->client_id = $request->client;
         $printFont->created_by = Crypt::decryptString($request->user_id);
         $printFont->created_date = date('Y-m-d H:i:s');
         $printFont->text = $request->back['text1']['text'];
         $printFont->color = $request->back['text1']['color'];
         $printFont->family = $request->back['text1']['family'];
         $printFont->weight = $request->back['text1']['weight'];
         $printFont->spacing = $request->back['text1']['spacing'];
         $printFont->top_pos = $request->back['text1']['top'];
         $printFont->left_pos = $request->back['text1']['left'];
         $printFont->width = $request->back['text1']['width']? $request->back['text1']['width']:'';
         $printFont->view = 'back';
         $printFont->size = $request->back['text1']['size'];
         $printFont->save();
    }

     if($request->back['text2'] && !empty($request->back['text2'])){
         $printFont = new PrintFont;
         $printFont->event_id = Crypt::decryptString($request->event_id);
         $printFont->product_id = $request->product_id;
         $printFont->client_id = $request->client;
         $printFont->created_by = Crypt::decryptString($request->user_id);
         $printFont->created_date = date('Y-m-d H:i:s');
         $printFont->text = $request->back['text2']['text'];
         $printFont->color = $request->back['text2']['color'];
         $printFont->family = $request->back['text2']['family'];
         $printFont->weight = $request->back['text2']['weight'];
         $printFont->spacing = $request->back['text2']['spacing'];
         $printFont->top_pos = $request->back['text2']['top'];
         $printFont->left_pos = $request->back['text2']['left'];
         $printFont->width = $request->back['text2']['width']? $request->back['text2']['width']:'';
         $printFont->view = 'back';
         $printFont->size = $request->back['text2']['size'];
         $printFont->save();
    }
    // return response()->json(['front'=>$request->front,'back'=>$request->back,'flag'=>TRUE],200);
    
    return response()->json(['msg'=>'Success','flag'=>TRUE],200);

    //return response()->json(['msg'=>'No data found','flag'=>FALSE],204);
  }

  public function get_print_prop(Request $request){

    $printArr = array('front'=>array(),'back'=>array()); 
    $fontArr = array('front'=>array(),'back'=>array()); 
    $product = array();
    $user = array();
    $prefix = array('order_prefix'=>'');
    $productImage = array();
    if($request->event){
      $print = PrintProp::select('*')
             ->where([
                ['event_id', '=', Crypt::decryptString($request->event)],
                ['product_id', '=', $request->product],
                ['client_id', '=', $request->client],
                ['is_active','=',1]
            ])->get();
      $frontcsstop = 0;
      $frontcssleft = 0;
      $backcsstop = 0;
      $backcssleft = 0;

      $frontcsswidth = 0;
      $frontcssheight = 0;
      $backcsswidth = 0;
      $backcssheight = 0;

      foreach ($print as $rows) {
        if($rows['view']=="Front"){
          array_push($printArr['front'], $rows);
          // $frontcssval = 'position: absolute; right: 0; bottom:0; width:250px;margin: 0 auto; left:'. $rows->left_pos_front.'px; top:'. $rows->top_pos_front.'px;';
          // array_push($printArr['frontcss'], $frontcssval);
          $frontcsstop = $rows->top_pos_front;
          $frontcssleft = $rows->left_pos_front;
          $frontcsswidth = $rows->width_pos_front;
          $frontcssheight = $rows->height_pos_front;
        }else{
          array_push($printArr['back'], $rows);
          // $backcssval = 'position: absolute; right: 0; left: 0; top: 5; bottom: 0; margin: 0 auto; left:'. $rows->left_pos_back.'px; top:'. $rows->top_pos_back.'px;';
          // array_push($printArr['frontcss'], $backcssval);
          $backcsstop = $rows->top_pos_back;
          $backcssleft = $rows->left_pos_back;
          $backcsswidth = $rows->width_pos_back;
          $backcssheight = $rows->height_pos_back;
        }
      }
      $sizeArr = array(
        'backcssleft'=>$backcssleft,
        'backcsstop'=>$backcsstop,
        'frontcsstop'=>$frontcsstop,
        'frontcssleft'=>$frontcssleft,
        'backcsswidth'=>$backcsswidth,
        'backcssheight'=>$backcssheight,
        'frontcsswidth'=>$frontcsswidth,
        'frontcssheight'=>$frontcssheight

      );
      
      $font = PrintFont::select('*')
             ->where([
                ['event_id', '=', Crypt::decryptString($request->event)],
                ['product_id', '=', $request->product],
                ['client_id', '=', $request->client],
                ['is_active','=',1]
            ])->get();
      foreach ($font as $rows) {
        if($rows['view']=="front"){
          array_push($fontArr['front'], $rows);
        }else{
          array_push($fontArr['back'], $rows);
        }
      }

      $product = Product::select('fp_product.*','pt.product as prod_type')
             ->leftJoin('fp_product_type as pt','pt.type_id','=','fp_product.type_id')
             ->where([
                ['fp_product.product_id', '=', $request->product]
            ])->first();

      $productImage = ProductColors::select('*')
                      ->where([
                        ['product_id','=',$request->product],
                        ['color', '=', $request->productColor],
                        ['is_Active', '=', 1]
                      ])->get();

      $user = Registration::select('*')
              ->where([
                  ['reg_id', '=', $request->client],
                  ['is_active','=',1]
              ])
              ->first();
    }
    
    $prefix = Event::select('order_prefix')
               ->where([
                  ['event_id', '=', Crypt::decryptString($request->event)],
                  ['is_active','=',1]
              ])->get();
    if($prefix->count()>0){
      $prefix = $prefix->first();
    }
    $recieptNum = $prefix['order_prefix'].'000001';

    //DB::connection()->enableQueryLog();
    $orders = Orders::select('order_id','reciept_id')->where([['is_active','=',1],['event_id','=',Crypt::decryptString($request->event)]])->orderBy('order_id','desc')->get();

    // $queries = DB::getQueryLog();
    // $last_query = end($queries);

    if($orders->count()>0){
      $order = $orders->first();

      preg_match_all('!\d+!', $order['reciept_id'] , $num);
      $recieptNum = $prefix['order_prefix'].str_pad(++$num[0][0], 6, '0', STR_PAD_LEFT); 
      //$recieptNum = ++$order['reciept_id'];
    }

    $order = array();
    if($request->order_id){
      $orders = Orders::where('order_id',$request->order_id)->get();
      if($orders->count()>0){
        $order = $orders->first();
      }
    }
    
    


    return response()->json(['msg'=>'Success','print'=>$printArr,'font'=>$fontArr,'product'=>$product,'recieptNum'=>$recieptNum,'user'=>$user,'order'=>$order,'productImage'=>$productImage,'sizeArr'=>$sizeArr,'flag'=>TRUE],200);

    // return response()->json(['msg'=>'No data found','flag'=>FALSE],204);
  }

  public function create_order(Request $request){

    if($request->event){

      $orders = new Orders;
      $orders->reciept_id = $request->orderNum? $request->orderNum:'';
      $orders->client_id = $request->client;
      $orders->event_id = Crypt::decryptString($request->event);
      $orders->product_id = $request->product;
      $orders->product_size = $request->productSize;
      $orders->product_color = $request->productColor;
      $orders->canvas_front_width = $request->canvas_front_width;
      $orders->canvas_front_height = $request->canvas_front_height;
      $orders->canvas_back_width = $request->canvas_back_width;
      $orders->canvas_back_height = $request->canvas_back_height;
      $orders->status = 'Ordered';
      $orders->created_by = 1;
      $orders->created_date = date('Y-m-d H:i:s');
      $orders->is_active = 1;
      if($orders->save()){

        $apiURL = 'https://ssapi.shipstation.com';
        $apiKey = 'e1d68769ecdc4f11bc0f518e4a306bc9';
        $apiSecret = '4115b9fbd0d94106b259fe5f7d8c31d2';


        $shipStation = new \LaravelShipStation\ShipStation($apiKey, $apiSecret, $apiURL);

        $customer = Registration::where('reg_id',$request->client)->get()->toArray();
        $address = new \LaravelShipStation\Models\Address();
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
        $shipStation->orders->post($order, 'createorder');

        return response()->json(['msg'=>'Success','flag'=>TRUE],200);
      }
    }
    return response()->json(['msg'=>'No data found','flag'=>FALSE],204);
  }

  public function get_thankyou(Request $request){

    $thankyou = array();
    if($request->event){
        $thankyou = ThankyouApp::select('*')
             ->where([
                ['event_id', '=', Crypt::decryptString($request->event)],
                ['is_active','=',1]
            ])->first();
    }
    return response()->json(['msg'=>'Success','thankyou'=>$thankyou,'flag'=>TRUE],200);
  }

  public function search_customers(Request $request){

    $customers = array();
    if($request->search){

     // DB::enableQueryLog(); 
      $customers = Registration::where([
                      ['is_active','=',1],
                      ['pre_reg','=',1],
                      ['event_id','=',Crypt::decryptString($request->event)]
                    ])
                    /*->whereRaw("(first_name='".$request->search."' OR last_name='".$request->search."' OR email='".$request->search."')")*/
                    ->whereRaw("(email='".$request->search."')")
                    ->first();
                   // dd(DB::getQueryLog());
      if(!empty($customers)){
        $flag = TRUE;
      }else{
        $flag = FALSE;
      }
      return response()->json(['msg'=>"Success",'customers'=>$customers,'flag'=>$flag],200);
    }
    return response()->json(['msg'=>'No search available','flag'=>FALSE],200);
  }

}