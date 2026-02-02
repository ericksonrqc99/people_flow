<?php

namespace Tests\Feature;

use App\Filament\Widgets\TicketsPerMonthChart;
use App\Filament\Widgets\TopCitizensWidget;
use App\Models\Citizen;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        // Crear datos de prueba
        $this->createTestData();
    }

    private function createTestData()
    {
        // Crear ciudadanos y tickets para pruebas
        $citizen1 = Citizen::factory()->create();
        $citizen2 = Citizen::factory()->create();

        // Crear varios tickets para ciudadanos
        Ticket::factory()->count(5)->create(['citizen_id' => $citizen1->id]);
        Ticket::factory()->count(3)->create(['citizen_id' => $citizen2->id]);
    }

    public function test_dashboard_page_loads_for_authenticated_user()
    {
        $response = $this->actingAs($this->user)->get('/admin');

        $response->assertStatus(200);
    }

    public function test_tickets_per_month_chart_returns_data()
    {
        $chart = new TicketsPerMonthChart;

        $data = $chart->getData();

        $this->assertArrayHasKey('datasets', $data);
        $this->assertArrayHasKey('labels', $data);
        $this->assertCount(12, $data['labels']); // 12 meses
    }

    public function test_tickets_per_month_chart_with_filter()
    {
        $chart = new TicketsPerMonthChart;
        $chart->filter = (string) now()->year;

        $data = $chart->getData();

        $this->assertArrayHasKey('datasets', $data);
        $this->assertIsArray($data['datasets'][0]['data']);
    }

    public function test_top_citizens_widget_returns_data()
    {
        $widget = new TopCitizensWidget;

        $table = $widget->table(app(\Filament\Tables\Table::class));

        $query = $table->getQuery();

        // Verificar que la query tenga los ciudadanos con tickets
        $this->assertGreaterThanOrEqual(2, $query->count());
    }

    public function test_top_citizens_widget_has_correct_columns()
    {
        $widget = new TopCitizensWidget;

        $table = $widget->table(app(\Filament\Tables\Table::class));

        $columns = $table->getColumns();

        $this->assertCount(5, $columns); // position, full_name, document_number, tickets_count, last ticket
    }

    public function test_top_citizens_widget_is_searchable()
    {
        $widget = new TopCitizensWidget;

        $table = $widget->table(app(\Filament\Tables\Table::class));

        $this->assertTrue($table->isSearchable());
    }

    public function test_citizen_full_name_displayed_correctly()
    {
        $citizen = Citizen::factory()->create([
            'names' => 'Test',
            'first_surname' => 'User',
            'second_surname' => 'Example',
        ]);

        $this->assertEquals('Test User Example', $citizen->full_name);
    }

    public function test_ticket_count_for_citizens()
    {
        $citizen = Citizen::first();

        $this->assertGreaterThan(0, $citizen->tickets()->count());
    }
}
