<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificationLog extends Model
{
    use HasFactory;

    const types = [
        1 => 'register',
        2 => 'login'
    ];

    protected $appends = ['attempt_type'];

    protected $guarded = [];

    protected $casts = ['is_succeeded' => 'boolean'];

    /**
     * @return string
     */
    public function getAttemptTypeAttribute()
    {
        return self::types[$this->attempt_type_id];
    }
}
