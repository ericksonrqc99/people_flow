<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Citizen;
use App\Models\User;

class CitizenPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->checkPermissionTo('Ver Todos Citizen');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Citizen $citizen): bool
    {
        return $user->checkPermissionTo('Ver Uno Citizen');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->checkPermissionTo('Crear Citizen');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Citizen $citizen): bool
    {
        return $user->checkPermissionTo('Actualizar Citizen');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Citizen $citizen): bool
    {
        return $user->checkPermissionTo('Eliminar Citizen');
    }

    /**
     * Determine whether the user can delete any models.
     */
    public function deleteAny(User $user): bool
    {
        return $user->checkPermissionTo('Eliminar Todos Citizen');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Citizen $citizen): bool
    {
        return $user->checkPermissionTo('Restaurar Citizen');
    }

    /**
     * Determine whether the user can restore any models.
     */
    public function restoreAny(User $user): bool
    {
        return $user->checkPermissionTo('Restaurar Todos Citizen');
    }

    /**
     * Determine whether the user can replicate the model.
     */
    public function replicate(User $user, Citizen $citizen): bool
    {
        return $user->checkPermissionTo('Replicar Citizen');
    }

    /**
     * Determine whether the user can reorder the models.
     */
    public function reorder(User $user): bool
    {
        return $user->checkPermissionTo('Reordenar Citizen');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Citizen $citizen): bool
    {
        return $user->checkPermissionTo('Forzar Eliminar Citizen');
    }

    /**
     * Determine whether the user can permanently delete any models.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->checkPermissionTo('Forzar Eliminar Todos Citizen');
    }
}
