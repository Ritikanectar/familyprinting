<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //use HasFactory;
    protected $table = 'fp_event';
    protected $primaryKey = 'event_id';
    public $timestamps = false;
    protected $fillable = [
      'event_type', 'app_type','app_name','start_datetime','end_datetime','orientation','event_place','client','created_date','modified_date','is_active','created_by'
    ];
}