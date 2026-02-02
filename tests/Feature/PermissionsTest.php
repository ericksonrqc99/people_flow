<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class PermissionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_have_permissions_assigned()
    {
        $user = User::factory()->create();
        $permission = Permission::create(['name' => 'Ver Modulo de Tickets']);

        $user->givePermissionTo($permission);

        $this->assertTrue($user->hasPermissionTo('Ver Modulo de Tickets'));
    }

    public function test_user_can_have_roles_assigned()
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'Admin']);

        $user->assignRole($role);

        $this->assertTrue($user->hasRole('Admin'));
    }

    public function test_role_can_have_permissions()
    {
        $role = Role::create(['name' => 'Supervisor']);
        $permission = Permission::create(['name' => 'Ver Panel De Tickets']);

        $role->givePermissionTo($permission);

        $this->assertTrue($role->hasPermissionTo('Ver Panel De Tickets'));
    }

    public function test_user_inherits_permissions_from_role()
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'Operator']);
        $permission = Permission::create(['name' => 'Ver Modulo de Tickets']);

        $role->givePermissionTo($permission);
        $user->assignRole($role);

        $this->assertTrue($user->hasPermissionTo('Ver Modulo de Tickets'));
    }

    public function test_user_without_permission_is_denied_access()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/tickets/module');

        $response->assertForbidden();
    }

    public function test_user_with_permission_can_access_route()
    {
        $user = User::factory()->create();
        $permission = Permission::create(['name' => 'Ver Modulo de Tickets']);
        $user->givePermissionTo($permission);

        $response = $this->actingAs($user)->get('/tickets/module');

        $response->assertStatus(200);
    }

    public function test_super_admin_has_all_permissions()
    {
        // Asumiendo que hay un rol super-admin
        $role = Role::create(['name' => 'Super Admin']);
        $permissions = [
            'Ver Modulo de Tickets',
            'Ver Panel De Tickets',
            'Administrar Usuarios',
        ];

        foreach ($permissions as $perm) {
            Permission::create(['name' => $perm]);
            $role->givePermissionTo($perm);
        }

        $user = User::factory()->create();
        $user->assignRole($role);

        foreach ($permissions as $perm) {
            $this->assertTrue($user->hasPermissionTo($perm));
        }
    }
}
