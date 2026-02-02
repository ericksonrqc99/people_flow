<?php

namespace Tests\Unit;

use App\Models\Area;
use App\Models\Citizen;
use App\Models\Ticket;
use App\Models\Type;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TicketTest extends TestCase
{
    use RefreshDatabase;

    public function test_ticket_can_be_created()
    {
        $ticket = Ticket::factory()->create();

        $this->assertModelExists($ticket);
    }

    public function test_ticket_belongs_to_area()
    {
        $area = Area::factory()->create();
        $ticket = Ticket::factory()->create(['area_id' => $area->id]);

        $this->assertInstanceOf(Area::class, $ticket->area);
        $this->assertEquals($area->id, $ticket->area->id);
    }

    public function test_ticket_belongs_to_citizen()
    {
        $citizen = Citizen::factory()->create();
        $ticket = Ticket::factory()->create(['citizen_id' => $citizen->id]);

        $this->assertInstanceOf(Citizen::class, $ticket->citizen);
        $this->assertEquals($citizen->id, $ticket->citizen->id);
    }

    public function test_ticket_belongs_to_registered_by_user()
    {
        $user = User::factory()->create();
        $ticket = Ticket::factory()->create(['registered_by_id' => $user->id]);

        $this->assertInstanceOf(User::class, $ticket->registeredBy);
        $this->assertEquals($user->id, $ticket->registeredBy->id);
    }

    public function test_ticket_belongs_to_attended_by_user()
    {
        $user = User::factory()->create();
        $ticket = Ticket::factory()->create(['attended_by_id' => $user->id]);

        $this->assertInstanceOf(User::class, $ticket->attendedBy);
        $this->assertEquals($user->id, $ticket->attendedBy->id);
    }

    public function test_ticket_belongs_to_called_by_user()
    {
        $user = User::factory()->create();
        $ticket = Ticket::factory()->create(['called_by_id' => $user->id]);

        $this->assertInstanceOf(User::class, $ticket->calledBy);
        $this->assertEquals($user->id, $ticket->calledBy->id);
    }

    public function test_ticket_has_status()
    {
        $status = Type::factory()->create(['model' => Ticket::class]);
        $ticket = Ticket::factory()->create(['status_id' => $status->id]);

        $this->assertInstanceOf(Type::class, $ticket->status);
        $this->assertEquals($status->id, $ticket->status->id);
    }

    public function test_ticket_logs_activity()
    {
        $ticket = Ticket::factory()->create();

        // Verificar que se creó un log de actividad
        $this->assertDatabaseHas('activity_log', [
            'log_name' => 'Tickets',
            'subject_type' => Ticket::class,
            'subject_id' => $ticket->id,
        ]);
    }

    public function test_ticket_fillable_attributes()
    {
        $data = [
            'code' => 'TICKET-001',
            'description' => 'Test ticket',
            'area_id' => Area::factory()->create()->id,
            'citizen_id' => Citizen::factory()->create()->id,
            'status_id' => Type::factory()->create(['model' => Ticket::class])->id,
        ];

        $ticket = Ticket::create($data);

        $this->assertEquals($data['code'], $ticket->code);
        $this->assertEquals($data['description'], $ticket->description);
    }
}
