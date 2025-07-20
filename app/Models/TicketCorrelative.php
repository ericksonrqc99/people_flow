<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketCorrelative extends Model
{
    protected $primaryKey = ['area_code', 'date'];
    public $incrementing = false;
    protected $guarded = [];
}
