<?php

namespace App\Console\Commands;

use App\Models\Days;
use App\Models\Entity;
use Illuminate\Console\Command;

class EntityList extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'entity:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $entities = Entity::orderBy('id')->get();
        $entities->map(function ($entity) {
            $this->info('E: ' . $entity->name);
            $days = Days::where('entity_id', $entity->id)->orderBy('anniv_at')->get();
            $days->map(function ($day) {
                $this->info(' D: ' . $day->anniv_at . $day->name);
            });
        });

        return 0;
    }
}
