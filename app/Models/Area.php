<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Area extends Model
{
    protected $guarded = [];


    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Area::class, 'parent_id');
    }

    // Subgerencias de esta gerencia
    public function children()
    {
        return $this->hasMany(Area::class, 'parent_id');
    }
    public function type()
    {
        return $this->belongsTo(Type::class);
    }
}
