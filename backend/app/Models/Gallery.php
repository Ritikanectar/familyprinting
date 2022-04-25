<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    //use HasFactory;
    protected $table = 'fp_gallery';
    protected $primaryKey = 'gallery_id';
    public $timestamps = false;
    protected $fillable = [
      'title', 'gallery_image','gallery_image_extension','created_by','created_date','is_active'
    ];
}
