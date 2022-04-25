<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class eventExec extends Model
{
   // use HasFactory;
    protected $table = 'fp_event_executive';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = ['user_id', 'event_id'];
}