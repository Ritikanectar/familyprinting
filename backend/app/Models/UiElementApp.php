<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UiElementApp extends Model
{
    //use HasFactory;
    protected $table = 'fp_ui_element_app';
    protected $primaryKey = 'app_id';
    public $timestamps = false;
    protected $fillable = [
      'event_id', 'tile_color','btn_text_color','btn_bg_color','popup_box_color','sel_highlight','body_text_color','toggled_color','un_toggled_color','front_back_toggle','header_typeface','created_date','created_by','is_active'
    ];
}