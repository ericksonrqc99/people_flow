<?php

namespace Tests\Unit;

use App\Models\Citizen;
use App\Models\Ticket;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CitizenTest extends TestCase
{
    use RefreshDatabase;

    public function test_citizen_can_be_created()
    {
        $citizen = Citizen::factory()->create();

        $this->assertModelExists($citizen);
    }

    public function test_citizen_full_name_accessor()
    {
        $citizen = Citizen::factory()->create([
            'names' => 'Juan',
            'first_surname' => 'Pérez',
            'second_surname' => 'García',
        ]);

        $this->assertEquals('Juan Pérez García', $citizen->full_name);
    }

    public function test_citizen_full_name_accessor_with_null_values()
    {
        $citizen = Citizen::factory()->create([
            'names' => 'Juan',
            'first_surname' => null,
            'second_surname' => 'García',
        ]);

        $this->assertEquals('Juan García', $citizen->full_name);
    }

    public function test_citizen_has_many_tickets()
    {
        $citizen = Citizen::factory()->create();
        $ticket1 = Ticket::factory()->create(['citizen_id' => $citizen->id]);
        $ticket2 = Ticket::factory()->create(['citizen_id' => $citizen->id]);

        $this->assertCount(2, $citizen->tickets);
        $this->assertTrue($citizen->tickets->contains($ticket1));
        $this->assertTrue($citizen->tickets->contains($ticket2));
    }

    public function test_citizen_logs_activity()
    {
        $citizen = Citizen::factory()->create();

        $this->assertDatabaseHas('activity_log', [
            'log_name' => 'Ciudadanos',
            'subject_type' => Citizen::class,
            'subject_id' => $citizen->id,
        ]);
    }

    public function test_citizen_fillable_attributes()
    {
        $data = [
            'names' => 'María',
            'first_surname' => 'López',
            'second_surname' => 'Martínez',
            'document_number' => '12345678',
            'phone' => '987654321',
            'email' => 'maria@example.com',
        ];

        $citizen = Citizen::create($data);

        $this->assertEquals($data['names'], $citizen->names);
        $this->assertEquals($data['document_number'], $citizen->document_number);
        $this->assertEquals($data['email'], $citizen->email);
    }
}
