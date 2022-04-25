<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //use HasFactory;
    protected $table = 'fp_product';
    protected $primaryKey = 'product_id';
    public $timestamps = false;
    protected $fillable = [
      'type_id','name','color','canvas_front_width','canvas_front_height','canvas_back_width','canvas_back_height','frontview_file','frontview_file_ext','backview_file','backview_file_ext','frontview_svg','backview_svg','created_by','created_date','is_active'
    ];
}