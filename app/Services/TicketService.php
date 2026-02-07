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

    public static function getUserActiveTicket(int $userId)
    {
        // Find ticket assigned to user with status "atendiendo" (assuming status_id = 6)
        // You might need to adjust the status_id based on your database
        $activeTicket = Ticket::where('attended_by_id', $userId)
            ->whereHas('status', function($query) {
                $query->where('type', 'atendiendo');
            })
            ->whereDate("created_at", Carbon::today())
            ->first();

        return $activeTicket ? $activeTicket->load('area', 'citizen', 'status', 'attendedBy') : null;
    }
}
