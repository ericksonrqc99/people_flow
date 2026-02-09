<?php

namespace App\Filament\Resources\AreaResource\Pages;

use App\Filament\Resources\AreaResource;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditArea extends EditRecord
{
    protected static string $resource = AreaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->before(function (Actions\DeleteAction $action) {
                    $record = $this->getRecord();
                    $dependencies = [];
                    if ($record->children()->exists()) $dependencies[] = 'sub-áreas';
                    if ($record->users()->exists()) $dependencies[] = 'usuarios';
                    if ($record->tickets()->exists()) $dependencies[] = 'tickets';

                    if (!empty($dependencies)) {
                        Notification::make()
                            ->danger()
                            ->title('No se pudo eliminar')
                            ->body('El área "' . $record->name . '" tiene ' . implode(', ', $dependencies) . ' asociados.')
                            ->send();

                        $action->cancel();
                    }
                }),
        ];
    }
}
