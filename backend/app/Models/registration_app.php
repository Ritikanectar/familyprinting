<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class registration_app extends Model
{
   // use HasFactory;
	protected $table = 'fp_registration_app';
    protected $primaryKey = 'app_id';
    public $timestamps = false;
    protected $fillable = [
      'bg_file_path', 'bg_file_extention','is_terms_conditions','terms_conditions','data_collected','is_first_name','is_last_name','is_phone','is_email','is_address_1','is_address_2','is_city','is_zip','button_color','button_text','event_id','created_date','created_by','modified_date','modified_by','is_active'
    ];
}