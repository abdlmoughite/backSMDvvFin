<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class roleseed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'nom_role' => 'admin',
            'id_role' => 1,
        ]);
        Role::create([
            'nom_role' => 'superadmin',
            'id_role' => 2,
        ]);
    }
}
