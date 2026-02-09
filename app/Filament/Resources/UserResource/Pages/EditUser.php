<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;
use Filament\Notifications\Notification;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    public function mount(int | string $record): void
    {
        parent::mount($record);
        
        // Verificar si el usuario está intentando editar su propio perfil
        $currentUser = Auth::user();
        $recordToEdit = $this->getRecord();
        
        if ($currentUser && $recordToEdit && $currentUser->id === $recordToEdit->id) {
            // Enviar notificación de error
            Notification::make()
                ->title('Acceso Denegado')
                ->body('No puedes editar tu propio perfil desde esta sección.')
                ->danger()
                ->send();
            
            // Redirigir a la lista de usuarios
            $this->redirect(UserResource::getUrl('index'));
            return;
        }
    }

    protected function getHeaderActions(): array
    {
        $actions = [];
        
        // Solo agregar el botón de eliminar si no es el super admin
        $record = $this->getRecord();
        $superAdminEmail = env('SUPER_ADMIN_EMAIL', 'super-admin@munisanmiguel-sanroman.gob.pe');
        
        if ($record->email !== $superAdminEmail) {
            $actions[] = Actions\DeleteAction::make()
                ->before(function (Actions\DeleteAction $action) {
                    $record = $this->getRecord();

                    if (\App\Models\Ticket::where('registered_by_id', $record->id)->exists()
                        || \App\Models\Ticket::where('attended_by_id', $record->id)->exists()) {
                        Notification::make()
                            ->danger()
                            ->title('No se pudo eliminar')
                            ->body('El usuario "' . $record->name . '" tiene tickets asociados.')
                            ->send();

                        $action->cancel();
                    }
                });
        }
        
        return $actions;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (empty($data['password'])) {
            unset($data['password']);
        }

        return $data;
    }
}
