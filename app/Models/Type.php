<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Type extends Model
{
    public function typeable(): MorphTo
    {
        return $this->morphTo();
    }
}
