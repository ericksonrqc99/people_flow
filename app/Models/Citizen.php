<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Citizen extends Model
{
    protected $guarded = [];

    // Accessor para obtener el nombre completo
    public function getFullNameAttribute(): string
    {
        return trim(($this->names ?? '') . ' ' . ($this->first_surname ?? '') . ' ' . ($this->second_surname ?? ''));
    }

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }
}
