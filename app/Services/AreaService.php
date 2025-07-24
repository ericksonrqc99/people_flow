<?php


namespace App\Services;

use App\Models\Area;

class AreaService
{

    public static function getActiveAreas()
    {
        return  Area::with('children')->where('is_active', '=', '1')->get();
    }
}
