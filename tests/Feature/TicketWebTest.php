<?php

namespace Tests\Feature;

use App\Models\Area;
use App\Models\Citizen;
use App\Models\Ticket;
use App\Models\Type;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TicketWebTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        // Crear usuario con permisos
        $this->user = User::factory()->create();
        $this->user->givePermissionTo(['Ver Modulo de Tickets', 'Ver Panel De Tickets']);

        // Crear datos básicos
        Area::factory()->create();
        Type::factory()->create(['model' => Ticket::class, 'type' => 'En espera']);
        Citizen::factory()->create();
    }

    public function test_ticket_generator_page_requires_authentication()
    {
        $response = $this->get('/tickets/module');

        $response->assertRedirect('/admin/login');
    }

    public function test_ticket_generator_page_requires_permission()
    {
        $userWithoutPermission = User::factory()->create();

        $response = $this->actingAs($userWithoutPermission)->get('/tickets/module');

        $response->assertForbidden();
    }

    public function test_ticket_generator_page_loads_successfully()
    {
        $response = $this->actingAs($this->user)->get('/tickets/module');

        $response->assertStatus(200);
        $response->assertViewIs('tickets.generator');
    }

    public function test_ticket_can_be_created_via_web()
    {
        $area = Area::first();
        $citizen = Citizen::first();
        $status = Type::first();

        $data = [
            'area_id' => $area->id,
            'citizen_id' => $citizen->id,
            'description' => $this->faker->sentence,
        ];

        $response = $this->actingAs($this->user)->post('/tickets/module', $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('tickets', [
            'area_id' => $area->id,
            'citizen_id' => $citizen->id,
            'registered_by_id' => $this->user->id,
        ]);
    }

    public function test_ticket_panel_requires_authentication()
    {
        $response = $this->get('/tickets/panel');

        $response->assertRedirect('/admin/login');
    }

    public function test_ticket_panel_loads_successfully()
    {
        $response = $this->actingAs($this->user)->get('/tickets/panel');

        $response->assertStatus(200);
        $response->assertViewIs('tickets.panel');
    }

    public function test_ticket_can_be_updated_via_web()
    {
        $ticket = Ticket::factory()->create(['status_id' => 5]); // En espera
        $newStatus = Type::factory()->create(['model' => Ticket::class, 'type' => 'Atendiendo']);

        $data = [
            'ticket_id' => $ticket->id,
            'status_id' => $newStatus->id,
            'attended_by_id' => $this->user->id,
        ];

        $response = $this->actingAs($this->user)->put('/tickets/panel', $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('tickets', [
            'id' => $ticket->id,
            'status_id' => $newStatus->id,
            'attended_by_id' => $this->user->id,
        ]);
    }

    public function test_ticket_can_be_called()
    {
        $ticket = Ticket::factory()->create(['status_id' => 5]); // En espera

        $response = $this->actingAs($this->user)->post('/tickets/call', [
            'ticket_id' => $ticket->id,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('tickets', [
            'id' => $ticket->id,
            'called_by_id' => $this->user->id,
        ]);
    }

    public function test_ticket_can_be_derived_to_another_area()
    {
        $ticket = Ticket::factory()->create();
        $newArea = Area::factory()->create();

        $response = $this->actingAs($this->user)->post('/tickets/derive', [
            'ticket_id' => $ticket->id,
            'area_id' => $newArea->id,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('tickets', [
            'id' => $ticket->id,
            'area_id' => $newArea->id,
        ]);
    }

    public function test_citizen_can_be_searched_by_dni()
    {
        $citizen = Citizen::factory()->create(['document_number' => '12345678']);

        $response = $this->actingAs($this->user)->get("/citizen/{$citizen->document_number}");

        $response->assertStatus(200);
        $response->assertJson([
            'names' => $citizen->names,
            'document_number' => $citizen->document_number,
        ]);
    }

    public function test_logout_works()
    {
        $response = $this->actingAs($this->user)->post('/logout');

        $response->assertRedirect('/admin/login');
        $this->assertGuest();
    }
}
