<?php

namespace App\Events;

use App\Models\Ticket;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TicketStatusChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $ticket;
    public $oldStatus;
    public $newStatus;

    public function __construct(Ticket $ticket, $oldStatus, $newStatus)
    {
        $this->ticket = $ticket;
        $this->oldStatus = $oldStatus;
        $this->newStatus = $newStatus;
        $this->ticket->load(['area', 'citizen', 'status']);
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('admin-dashboard'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'ticket.status.changed';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->ticket->id,
            'code' => $this->ticket->code,
            'citizen_name' => $this->ticket->citizen->name ?? 'Ciudadano',
            'area_name' => $this->ticket->area->name ?? 'Sin área',
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'updated_at' => now()->format('H:i:s'),
            'message' => "🔄 Ticket {$this->ticket->code} actualizado a: {$this->newStatus}",
            'type' => 'ticket.status.changed'
        ];
    }
}
