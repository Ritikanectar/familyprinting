<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
   // use HasFactory;
    protected $table = 'fp_orders';
    protected $primaryKey = 'order_id';
    public $timestamps = false;
}