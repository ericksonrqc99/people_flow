<?php


namespace App\Services;

use App\Models\Area;

class AreaService
{

    public static function getActiveAreas()
    {
        return Area::with([
            'children' => function ($query) {
                $query->where('is_active', 1);
            },
        ])
            ->where('is_active', 1)
            ->get();
    }


    public static function getAreaById(int $areaId)
    {
        return Area::where('id', $areaId)
            ->where('is_active', 1)
            ->first();
    }
}
