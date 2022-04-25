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

            $products = Product::select('pc.frontview_file','fp_product.name','spa.product_id','fp_product.other_size as other_size')
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

      $products = array('sizes'=>array(),'colors'=>array());

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

      /*$mail = new PHPMailer();
      $mail->IsSMTP();
      $mail->Mailer = "smtp";
      $mail->SMTPDebug  = 2;  
      $mail->SMTPAuth   = TRUE;
      $mail->SMTPSecure = "ssl";
      $mail->Port       = 465;
      $mail->Host       = "smtp.gmail.com";
      $mail->Username   = "meeshochristmas@gmail.com";
      $mail->Password   = "ktotjtvmpsfawuch";

      $mail->IsSMTP();  // telling the class to use SMTP
      $mail->IsHTML(true);
      $mail->AddAddress("nehakumari5336931@gmail.com", "");
      $mail->SetFrom("meeshochristmas@gmail.com", "Meesho");
      $mail->AddReplyTo("meeshochristmas@gmail.com", "Meesho");
      $mail->Subject = "Cogratulation! You have won surprise gift from meesho";
      $content = '<title>eTemplate 2 :: LogicMind</title> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1">  <meta http-equiv="X-UA-Compatible" content="IE=edge">   <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""> <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&amp;display=swap" rel="stylesheet">  <style type="text/css">   body{font-family: "Montserrat", sans-serif; } </style>  <p>   </p>
<p></p>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
      <td align="center" style="padding: 0px 10px 0px 10px;">       <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 800px; background-color:#fff; border:solid 2px #ededed;">
                    <tbody>
<tr>
            <td>              <table border="0" cellpadding="0" align="center" cellspacing="0" width="100%">
                <tbody>
<tr>
                  <td align="left" valign="top" style="color: #111111;width:50%;vertical-align: middle;padding-left: 60px;">                    <h2 style="text-align: left; font-size: 36px; line-height: 43px; color: rgb(0, 0, 0); margin: 0px; font-weight: 700;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h2>
</td>
                  <td align="right" style="padding-left:10px;"><p><img src="http://nt3dg.nectarinfotel.com/banner.png" style="width: 841.047px;"><br></p>
</td>
                </tr>
                              </tbody>
</table>
              </td>
          </tr>
          <tr>
            <td style=" padding:40px 0px;"><h2 style="text-align: center; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-weight: 700; line-height: 43px; font-size: 36px;">Hello Neha,</h2>
<h2 style="text-align: center; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-weight: 700; line-height: 43px; font-size: 36px;">Congratulation!</h2>
<p style="text-align: center; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-weight: 700; line-height: 43px; font-size: 36px;"><br></p>
<p style="text-align: center; color: rgb(206, 206, 206); font-size: 15px; line-height: 20px;"><b>We are happy to announce that you have won surprise gift from meesho.</b></p>
<p style="text-align: center; color: rgb(206, 206, 206); font-size: 15px; line-height: 20px;"><b>Meesho will deliver your surprise at your given address inside meesho app.</b></p>
<p style="text-align: center; color: rgb(206, 206, 206); font-size: 15px; line-height: 20px;"><b>Followings are biggest surprise gift ever in this christmas season.</b></p>
            <p></p>
<p><br></p>
</td>
          </tr>
              <tr>
            <td>              <table border="0" cellpadding="0" align="center" cellspacing="0" width="100%" style="max-width: 680px;">
                <tbody>
<tr>
                  <td>                    <div style="border:solid 1px #BEBEBE; margin: 0 1%; width:31%; text-align: center;float: left;"><img src="http://nt3dg.nectarinfotel.com/mobile.jpg" style="width: 160px;"><br><p style="font-size:12px;line-height: 15px;color:#000;font-weight:700;"><br></p>
<p style="font-size:12px;line-height: 15px;color:#000;font-weight:700;">25,000 Mi Mobile</p>
<p style="font-size:12px;line-height: 15px;color:#000;font-weight:700;"><span class="a-list-item" style="color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; text-align: start; font-weight: 400;">Processor: Octa-core Helio G35 and upto 2.3GHz clock speed&nbsp;</span><span style="color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; text-align: start; font-weight: 400;">Camera: 13+2 MP Dual Rear camera with AI portrait| 5 MP front camera.&nbsp;</span><span style="color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; text-align: start; font-weight: 400;">Battery: 5000 mAH large battery with 10W wired charger in-box.</span></p>
                    </div>
                    <div style="border:solid 1px #BEBEBE; margin: 0 1%; width:31%; text-align: center;float: left;"><img src="http://nt3dg.nectarinfotel.com/induction.jpg" style="width: 160px;"><br><p style="font-size:12px;line-height: 15px;color:#000;font-weight:700;"><br></p>
<p style="font-size:12px;line-height: 15px;color:#000;font-weight:700;">30,000 Philips Induction<br></p>
                      <p style="line-height: 20px; padding: 0px 10px;"><span style="color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; text-align: start;">Electromagnetic induction technology ensures high heating efficiency, cooks food faster than a gas stove. Seals nutrition into the food and prevents vitamin loss.</span><br></p>
                    </div>
                    <div style="border:solid 1px #BEBEBE; margin: 0 1%; width:31%; text-align: center;float: left;"><img src="http://nt3dg.nectarinfotel.com/tv.jpg" style="width: 160px; height:150px;"></div>
<div style="border:solid 1px #BEBEBE; margin: 0 1%; width:31%; text-align: center;float: left;"><br><p style="font-size:12px;line-height: 15px;color:#000;font-weight:700;">5,000 Sony Smart TV&nbsp;</p>
<p style="font-size:12px;line-height: 15px;color:#000;font-weight:700;"><span class="a-list-item" style="color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; text-align: start; font-weight: 400;">Resolution: HD Ready (1366x768) | Refresh Rate: 60 hertz.&nbsp;</span><span style="color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; text-align: start; font-weight: 400;">Connectivity: 2 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices. Sound : 20 Watts Output | Open Baffle Speaker | ClearAudio+ technology | TV MusicBox.&nbsp;</span><span style="color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; text-align: left; font-weight: 400;">1 year warranty provided by the manufacture</span></p>
                    </div>
                  </td>
                </tr>
              </tbody>
</table>
            </td>
              </tr>
                  <tr>
            <td style=" padding:40px 0px;">             <table border="0" cellpadding="0" align="center" cellspacing="0" width="100%" style="max-width: 680px;">
                <tbody>
<tr>
                  <td><p><br></p>
</td>
                  <td bgcolor="#34BFFC" cellpadding="0" style="padding:0px 20px;">                    <p style="font-size: 21px;line-height: 26px;font-weight: 600; letter-spacing: 0.71px;margin-top: 0px;"><br></p>
<p style="font-size: 21px;line-height: 26px;font-weight: 600; letter-spacing: 0.71px;margin-top: 0px;">Thank You for shopping with us</p>
                    <p style="font-size: 14px; line-height:25px;letter-spacing: 0.48px;color: #fff;">We will surprise you with delivery at any time at your doorstep. Be ready for surprise gift. Wish you and your family merry christmas!</p>
                    <br/><br/>
</td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </tbody>
</table>
                </td>
          </tr>
                        <tr style="background:#000;">
            <td style=" padding:15px 0px;">             <table border="0" cellpadding="0" align="center" cellspacing="0" width="100%" style="max-width: 680px;">
                <tbody>
<tr>
                  <td colspan="2" align="center" style="padding-top: 5px;"><p><img src="http://nt3dg.nectarinfotel.com/meesho.png" style="width: 150px;height:150px"><br></p>
</td>
                </tr>
                                              </tbody>
</table>
              </td>
          </tr>
                        </tbody>
</table>
      </td>
    </tr>
  </tbody>
</table>';
      $mail->MsgHTML($content); 
      $mail->Send();

      return response()->json(['msg'=>'Event created successfully','flag'=>TRUE],200);*/

    }

    public function get_product_details(Request $request){

      $product = array(); $productProp=array(); $uiElement=array();
      $colorProd = array();
      $frontSvg=""; $backSvg=""; $preview=array();
      if($request->product_id){
        $event_id = Crypt::decryptString($request->event_id);
        $user_id = Crypt::decryptString($request->user_id);
       
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

        
        return response()->json(['product'=>$product,'productProp'=>$productProp,'uiElement'=>$uiElement,'preview'=>$preview,'gallery'=>$gallery,'frontSvg'=>$frontSvg,'backSvg'=>$backSvg,'prod_colors'=>$colorProd,'flag'=>TRUE],200);
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
         $printApp->save();
      }

      if($request->event_id){

        $prefix = array('order_prefix'=>'');
        $eventType = '';
        $prefix = Event::select('order_prefix','event_type')
                   ->where([
                      ['event_id', '=', Crypt::decryptString($request->event_id)],
                      ['is_active','=',1]
                  ])->get();
        if($prefix->count()>0){
          $prefix = $prefix->first();
          $eventType = $prefix['event_type'];
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
          return response()->json(['msg'=>'Success','eventType'=>$eventType,'flag'=>TRUE],200);
        }
      }
     // return response()->json(['msg'=>'Success','flag'=>TRUE],200);
    }
    return response()->json(['msg'=>'Failed','flag'=>FALSE],200);
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
      foreach ($print as $rows) {
        if($rows['view']=="Front"){
          array_push($printArr['front'], $rows);
        }else{
          array_push($printArr['back'], $rows);
        }
      }

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
      $recieptNum = $prefix['order_prefix'].str_pad($num[0]? ++$num[0][0]:'1', 6, '0', STR_PAD_LEFT); 
      //$recieptNum = ++$order['reciept_id'];
    }

    $order = array();
    if($request->order_id){
      $orders = Orders::where('order_id',$request->order_id)->get();
      if($orders->count()>0){
        $order = $orders->first();
      }
    }
    
    


    return response()->json(['msg'=>'Success','print'=>$printArr,'font'=>$fontArr,'product'=>$product,'recieptNum'=>$recieptNum,'user'=>$user,'order'=>$order,'productImage'=>$productImage,'flag'=>TRUE],200);

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
                    ->get();
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