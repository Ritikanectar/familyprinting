<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    //use HasFactory;
    protected $table = 'fp_registration';
    protected $primaryKey = 'reg_id';
    public $timestamps = false;
    protected $fillable = [
      'event_id','first_name','last_name','contact','email','address_1','address_2','city','zip','is_active'
    ];
}
