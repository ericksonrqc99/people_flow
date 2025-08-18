<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Type extends Model
{
    public function typeable(): MorphTo
    {
        return $this->morphTo();
    }


    public function area(): HasMany
    {
        return $this->hasMany(Area::class);
    }

    public function ticket(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }
}
