<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThankyouApp extends Model
{
   // use HasFactory;
	protected $table = 'fp_thank_you_app';
    protected $primaryKey = 'app_id';
    public $timestamps = false;
    protected $fillable = [
      'event_id','redirect_url','is_message','message','is_pickup_ins','pickup_ins','bg_thankyou_file','bg_thankyou_ext','created_by','created_date','is_active','logo_file_path','logo_file_extention'
    ];
}
