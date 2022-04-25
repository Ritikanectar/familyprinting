<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductColors extends Model
{
    //use HasFactory;
    protected $table = 'fp_product_colors';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
}