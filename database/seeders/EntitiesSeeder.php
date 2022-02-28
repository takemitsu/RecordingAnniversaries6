<?php

namespace Database\Seeders;

use App\Models\Days;
use App\Models\Entity;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EntitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('days')->truncate();

        $user = User::where('name', 'takemitsu')
            ->where('email', 'takemitsu@notespace.jp')
            ->first();
        if ($user) {
            $entities1 = Entity::firstOrCreate([
                'user_id' => $user->id,
                'name' => 'Test Group Name',
                'desc' => 'Test Group Desc',
            ]);

            $now = Carbon::yesterday();
            for ($i = 0; $i < 10; $i++) {
                $now = $now->addDay();
                $day = Days::create([
                    'entity_id' => $entities1->id,
                    'name' => 'Test Entity ' . strval($i),
                    'desc' => 'Text Entity Desc ' . $i,
                    'anniv_at' => $now->format('Y-m-d'),
                ]);
            }

            $entities2 = Entity::firstOrCreate([
                'user_id' => $user->id,
                'name' => 'Test Group Name 2',
                'desc' => null,
            ]);

            for ($i = 0; $i < 10; $i++) {
                $now = $now->addDay();
                $day = Days::create([
                    'entity_id' => $entities2->id,
                    'name' => 'Test Entity ' . strval($i),
                    'desc' => null,
                    'anniv_at' => $now->format('Y-m-d'),
                ]);
            }
        }
    }
}
