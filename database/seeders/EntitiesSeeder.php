<?php

namespace Database\Seeders;

use App\Models\Days;
use App\Models\Entity;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EntitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('days')->truncate();
        // DB::table('entities')->truncate();

        $user = User::where('name', 'nobody')
            ->where('email', 'nobody@example.com')
            ->first();
        if (!$user) {
            $user = User::create([
                'name' => 'nobody',
                'email' => 'nobody@example.com',
                'password' => Hash::make('nobodyTest123'),
            ]);
        }

        $now = Carbon::yesterday();
        $now = $now->subDay();
        for ($h = 0; $h < 4 + 1; $h++) {
            $entities1 = Entity::firstOrCreate([
                'user_id' => $user->id,
                'name' => 'Test Group Name' . $h,
                'desc' => 'Test Group Desc' . $h,
            ]);

            for ($i = 0; $i < $h; $i++) {
                $now = $now->addDay();
                $day = Days::create([
                    'entity_id' => $entities1->id,
                    'name' => 'Test Entity ' . strval($i),
                    'desc' => 'Text Entity Desc ' . $i,
                    'anniv_at' => $now->format('Y-m-d'),
                ]);
            }
        }
    }
}
