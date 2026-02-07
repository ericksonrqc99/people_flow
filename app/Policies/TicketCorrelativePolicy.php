<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\TicketCorrelative;
use App\Models\User;

class TicketCorrelativePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->checkPermissionTo('Ver Todos TicketCorrelative');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TicketCorrelative $ticketcorrelative): bool
    {
        return $user->checkPermissionTo('Ver Uno TicketCorrelative');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->checkPermissionTo('Crear TicketCorrelative');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TicketCorrelative $ticketcorrelative): bool
    {
        return $user->checkPermissionTo('Actualizar TicketCorrelative');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TicketCorrelative $ticketcorrelative): bool
    {
        return $user->checkPermissionTo('Eliminar TicketCorrelative');
    }

    /**
     * Determine whether the user can delete any models.
     */
    public function deleteAny(User $user): bool
    {
        return $user->checkPermissionTo('Eliminar Todos TicketCorrelative');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, TicketCorrelative $ticketcorrelative): bool
    {
        return $user->checkPermissionTo('Restaurar TicketCorrelative');
    }

    /**
     * Determine whether the user can restore any models.
     */
    public function restoreAny(User $user): bool
    {
        return $user->checkPermissionTo('Restaurar Todos TicketCorrelative');
    }

    /**
     * Determine whether the user can replicate the model.
     */
    public function replicate(User $user, TicketCorrelative $ticketcorrelative): bool
    {
        return $user->checkPermissionTo('Replicar TicketCorrelative');
    }

    /**
     * Determine whether the user can reorder the models.
     */
    public function reorder(User $user): bool
    {
        return $user->checkPermissionTo('Reordenar TicketCorrelative');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, TicketCorrelative $ticketcorrelative): bool
    {
        return $user->checkPermissionTo('Forzar Eliminar TicketCorrelative');
    }

    /**
     * Determine whether the user can permanently delete any models.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->checkPermissionTo('Forzar Eliminar Todos TicketCorrelative');
    }
}
