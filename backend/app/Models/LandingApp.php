<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingApp extends Model
{
    //use HasFactory;
    protected $table = 'fp_landing_app';
    protected $primaryKey = 'app_id';
    public $timestamps = false;
    protected $fillable = [
      'event_id','button_text','bg_file_path','bg_file_extention','created_by','created_date','is_active'
  	];
}