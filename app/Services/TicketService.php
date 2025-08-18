<?php

namespace App\Services;

use App\Models\Area;
use App\Models\Ticket;
use Carbon\Carbon;

class TicketService
{


    public static function  getTicketForId(string $id)
    {
        $findTicket = Ticket::find($id);
        return $findTicket;
    }


    public static function getTicketsTodayByArea(Area $area)
    {
        $foundTickets = Ticket::whereDate("created_at", Carbon::today())
            ->where('area_id', '=', $area->id)
            ->latest()->get();

        return $foundTickets->load('area', 'citizen', 'status', 'attendedBy');
    }
}
