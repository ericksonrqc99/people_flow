<?php

namespace App\Services;

use App\Models\Area;
use App\Models\Type;
use Illuminate\Support\Collection;

class TypeService
{

    public static function getTypeForType(string $type): Type
    {
        return Type::where('type', '=', $type)->first();
    }
    public static function getAllTypesForModel(string $model): Collection
    {
        return Type::where('model', '=', $model)->get();
    }
    public static function getTypeForId(int $id): string
    {
        $findType = Type::find($id);
        return $findType;
    }
}
