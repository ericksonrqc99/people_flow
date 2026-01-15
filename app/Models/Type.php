<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Type extends Model
{
    use LogsActivity;

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

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('Tipos')
            ->logAll()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}
