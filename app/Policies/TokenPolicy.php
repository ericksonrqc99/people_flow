<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Token;
use App\Models\User;

class TokenPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->checkPermissionTo('Ver Todos Token');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Token $token): bool
    {
        return $user->checkPermissionTo('Ver Uno Token');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->checkPermissionTo('Crear Token');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Token $token): bool
    {
        return $user->checkPermissionTo('Actualizar Token');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Token $token): bool
    {
        return $user->checkPermissionTo('Eliminar Token');
    }

    /**
     * Determine whether the user can delete any models.
     */
    public function deleteAny(User $user): bool
    {
        return $user->checkPermissionTo('Eliminar Todos Token');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Token $token): bool
    {
        return $user->checkPermissionTo('Restaurar Token');
    }

    /**
     * Determine whether the user can restore any models.
     */
    public function restoreAny(User $user): bool
    {
        return $user->checkPermissionTo('Restaurar Todos Token');
    }

    /**
     * Determine whether the user can replicate the model.
     */
    public function replicate(User $user, Token $token): bool
    {
        return $user->checkPermissionTo('Replicar Token');
    }

    /**
     * Determine whether the user can reorder the models.
     */
    public function reorder(User $user): bool
    {
        return $user->checkPermissionTo('Reordenar Token');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Token $token): bool
    {
        return $user->checkPermissionTo('Forzar Eliminar Token');
    }

    /**
     * Determine whether the user can permanently delete any models.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->checkPermissionTo('Forzar Eliminar Todos Token');
    }
}
