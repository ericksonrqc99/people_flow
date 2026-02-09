<?php

namespace App\Filament\Resources\CitizenResource\Pages;

use App\Filament\Resources\CitizenResource;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditCitizen extends EditRecord
{
    protected static string $resource = CitizenResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->before(function (Actions\DeleteAction $action) {
                    $record = $this->getRecord();

                    if ($record->tickets()->exists()) {
                        Notification::make()
                            ->danger()
                            ->title('No se pudo eliminar')
                            ->body('El ciudadano "' . $record->names . ' ' . $record->first_surname . '" tiene tickets asociados.')
                            ->send();

                        $action->cancel();
                    }
                }),
        ];
    }
}
