<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artwork extends Model
{
    //use HasFactory;
    protected $table = 'fp_artwork';
    protected $primaryKey = 'artwork_id';
    public $timestamps = false;
    protected $fillable = [
       'gallery_id','title','artwork_image','artwork_image_extension','created_date','created_by','is_active'
    ];
}
