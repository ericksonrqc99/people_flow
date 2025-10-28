<?php

namespace App\Filament\Resources\TicketResource\Pages;

use App\Filament\Resources\TicketResource;
use App\Models\Area;
use App\Services\TicketCorrelativeService;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateTicket extends CreateRecord
{
    protected static string $resource = TicketResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Obtener el área seleccionada
        $area = Area::find($data['area_id']);
        
        if (!$area) {
            throw new \Exception('Área no encontrada');
        }

        // Usar el servicio para generar el código del ticket
        $ticketCorrelativeService = app(TicketCorrelativeService::class);
        $ticketCode = $ticketCorrelativeService->generateTicketCode($area);

        if (!$ticketCode) {
            throw new \Exception('No se pudo generar el código del ticket');
        }

        // Generar los códigos usando el mismo formato que el controlador
        $data['code'] = $ticketCode['area_code'] . '-' . $ticketCode['date'] . '-' . $ticketCode['correlative_count'];
        $data['visible_code'] = $ticketCode['area_code'] . '-' . $ticketCode['correlative_count'];
        
        // Agregar el usuario que registra si no está presente
        if (!isset($data['registered_by_id'])) {
            $data['registered_by_id'] = Auth::id();
        }

        return $data;
    }
}
