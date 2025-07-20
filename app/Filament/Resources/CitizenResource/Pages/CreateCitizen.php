<?php

namespace App\Filament\Resources\CitizenResource\Pages;

use App\Filament\Resources\CitizenResource;
use App\Models\Citizen;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;

class CreateCitizen extends CreateRecord
{
    protected static string $resource = CitizenResource::class;

    // public function mutateFormDataBeforeCreate(array $data): array
    // {
    //     $citizenFound = Citizen::where('dni', $data['dni'])->exists();
    //     if ($citizenFound) {
    //         Notification::make()
    //             ->warning()
    //             ->title('El DNI ya esta en uso')
    //             ->body('El DNI que ingresaste ya está siendo usado')
    //             ->send();
    //         return [];
    //     }

    //     dd($citizenFound);
    // }
}
