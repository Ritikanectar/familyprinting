<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductApp extends Model
{
  //  use HasFactory;
	protected $table = 'fp_product_app';
    protected $primaryKey = 'app_id';
    public $timestamps = false;
    protected $fillable = [
      'event_id','bg_file_path','bg_file_extention','header_text','created_by','created_date','is_active'
    ];
}
