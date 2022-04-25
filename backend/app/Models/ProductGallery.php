<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductGallery extends Model
{
  //  use HasFactory;
	protected $table = 'fp_product_gallery';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
      'event_id','product_id','gallery_id','created_by','created_date','is_active'
    ];
     
}
