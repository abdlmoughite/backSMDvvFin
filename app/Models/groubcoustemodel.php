<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class groubcoustemodel extends Model
{
    use HasFactory;
    public $primaryKey = 'id';
    public $timestamps = true;
    public $table = 'groubcoust';
    public $fillable = [
        'coust','date_coust'
    ];
}
