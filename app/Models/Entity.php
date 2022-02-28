<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Entity extends Model
{
    use SoftDeletes;

    public function days() {
        return $this->hasMany('App\Models\Days');
    }

    public function user() {
        return $this->belongsTo('App\Models\User');
    }
}
