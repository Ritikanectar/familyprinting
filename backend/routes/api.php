<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/***************** Admin *****************************/
Route::post('/login','LoginController@login');
//Route::post('/user','AppController@user')->middleware('auth:api');
Route::post('/get-event-dd','AppController@get_event_dd')->middleware('auth:api');
Route::post('/create-event','AppController@create_event')->middleware('auth:api');
Route::post('/get-events','AppController@get_events')->middleware('auth:api');
Route::post('/delete-events','AppController@delete_event')->middleware('auth:api');
Route::post('/get-event','AppController@get_event')->middleware('auth:api');
Route::get('/export-event','AppController@export_event');

Route::post('/create-user','AppController@create_user')->middleware('auth:api');
Route::post('/get-users','AppController@get_users')->middleware('auth:api');
Route::post('/get-user','AppController@get_user')->middleware('auth:api');
Route::post('/update-user','AppController@update_user')->middleware('auth:api');

Route::post('/create-landing','AppController@create_landing')->middleware('auth:api');

Route::post('/create-welcome','AppController@create_welcome')->middleware('auth:api');
Route::post('/deactive-user','AppController@deactive_user')->middleware('auth:api');
Route::post('/get-layout-dd','AppController@get_layout_dd')->middleware('auth:api');
Route::post('/get-app-list','AppController@get_app_list')->middleware('auth:api');
Route::post('/create-registration','AppController@create_registration')->middleware('auth:api');

Route::post('/create-product','AppController@create_product')->middleware('auth:api');
Route::post('/get-products','AppController@get_products')->middleware('auth:api');
Route::post('/get-product','AppController@get_product')->middleware('auth:api');
Route::post('/delete-product','AppController@delete_product')->middleware('auth:api');
Route::get('/export-product','AppController@export_product');
Route::post('/update-product','AppController@update_product')->middleware('auth:api');
Route::post('/add-product-type','AppController@add_product_type')->middleware('auth:api');
Route::post('/remove-product-type','AppController@remove_product_type')->middleware('auth:api');

Route::post('/update-event','AppController@update_event')->middleware('auth:api');
Route::post('/get-prod-dd','AppController@get_prod_dd')->middleware('auth:api');
Route::post('/create-product-layout','AppController@create_product_layout')->middleware('auth:api');
Route::post('/change-status-product','AppController@change_status_product')->middleware('auth:api');
Route::post('/create-gallery','AppController@create_gallery')->middleware('auth:api');
Route::get('/get-gallery','AppController@get_gallery')->middleware('auth:api');

Route::post('/create-artwork','AppController@create_artwork')->middleware('auth:api');
Route::get('/get-cliparts','AppController@get_cliparts')->middleware('auth:api');
Route::get('/delete-cliparts','AppController@delete_cliparts')->middleware('auth:api');
Route::post('/replace-artwork','AppController@replace_artwork')->middleware('auth:api');

Route::get('/delete-gallery','AppController@delete_gallery')->middleware('auth:api');

Route::get('/get-design-pdf','AppController@get_design_pdf');

Route::get('/get-stores','AppController@get_stores');

Route::post('/assign-gallery','AppController@assign_gallery')->middleware('auth:api');
Route::post('/create-product-design','AppController@create_product_design')->middleware('auth:api');
Route::post('/create-preview','AppController@create_preview')->middleware('auth:api');
Route::post('/create-thankyou','AppController@create_thankyou')->middleware('auth:api');
Route::post('/create-ui','AppController@create_ui')->middleware('auth:api');
Route::post('/get-order-list','AppController@get_order_list')->middleware('auth:api');
Route::get('/get-order-xml','AppController@get_order_xml');


Route::get('logout','LoginController@logout');


/********************** Public *******************************/
Route::get('/get-landing-layout','PublicController@get_landing_layout');
Route::get('/get-welcome-layout','PublicController@get_welcome_layout');
Route::get('/get-reg-fields','PublicController@get_reg_fields');
Route::post('/register','PublicController@register');
Route::post('/get-product-details','PublicController@get_product_details');
Route::post('/get-artwork-by-gallery','PublicController@get_artwork_by_gallery');
Route::post('/create-print-prop','PublicController@create_print_prop');
Route::post('/get-print-prop','PublicController@get_print_prop');
Route::post('/create-order','PublicController@create_order');
Route::post('/get-thankyou','PublicController@get_thankyou');
Route::get('/get-product-layout','PublicController@get_product_layout');
Route::get('/search-customers','PublicController@search_customers');

Route::get('/get-product-property','PublicController@get_product_property');