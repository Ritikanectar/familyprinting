<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrintFont extends Model
{
    //use HasFactory;
    protected $table = 'fp_print_fonts';
    protected $primaryKey = 'prop_id';
    public $timestamps = false;
//     protected $fillable = [
//       'event_id','product_id','print_location'=> ""
// ,'product_option'=> ""
// ,'gallery_type'=> ""
// ,'created_by','created_date','is_active'
//     ];
}
