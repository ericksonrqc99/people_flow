<?php


namespace App\Services;

use App\Models\Area;
use App\Models\TicketCorrelative;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TicketCorrelativeService
{
    public  function existsPrefixTodayForArea(Area $area): bool
    {
        $area_code = $area->code;
        return TicketCorrelative::where("area_code", '=', $area_code)
            ->where('date', '=', Carbon::today()->toDateString())->exists();
    }


    public function getLastCorrelativeTodayForArea(Area $area)
    {
        $todayTicketCode = (TicketCorrelative::where('area_code', '=', $area->code)
            ->where('date', '=', Carbon::today()->toDateString())
            ->latest()
            ->first());
        return $todayTicketCode;
    }

    public function generateTicketCode(Area $area)
    {
        return DB::transaction(function () use ($area) {
            $areaCode = $area->code;

            if (!$this->existsPrefixTodayForArea($area)) {
                return TicketCorrelative::create([
                    'area_code' => $areaCode,
                    'correlative_count' => 1,
                    'date' => Carbon::today()->toDateString(),
                ]);
            }

            $record = TicketCorrelative::where('area_code', $area->code)
                ->where('date', Carbon::today()->toDateString())
                ->lockForUpdate()
                ->first();

            if (!$record) {
                throw new \Exception("No se encontró un correlativo para el área '{$areaCode}' y la fecha actual.");
            }

            $lastCorrelative = $this->getLastCorrelativeTodayForArea($area);

            TicketCorrelative::where('area_code', $record->area_code)
                ->where('date', $record->date)
                ->update([
                    'correlative_count' => $lastCorrelative->correlative_count + 1,
                    'updated_at' => now()
                ]);

            $updated = TicketCorrelative::where('area_code', $record->area_code)
                ->where('date', $record->date)
                ->first();

            return $updated;
        });
    }
}
