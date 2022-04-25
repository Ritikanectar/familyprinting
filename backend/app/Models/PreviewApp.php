<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreviewApp extends Model
{
  //  use HasFactory;
	protected $table = 'fp_preview_app';
    protected $primaryKey = 'app_id';
    public $timestamps = false;
    protected $fillable = [
      'event_id','preview','preview_file','preview_file_ext','created_by','created_date','is_active'
    ];
}
