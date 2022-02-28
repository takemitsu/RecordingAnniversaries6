<?php

namespace App\Http\Controllers;

use App\Models\Entity;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class EntityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function pickup()
    {
        $entities = Entity::where('user_id',auth()->user()->id)
            ->has('days')
            ->with('days')
            ->orderBy('created_at', 'asc')
            ->get();

        foreach ($entities as $key => $entity) {
            if (count($entity->days) == 0) {
                unset ($entities[$key]);
            } else {
                // diff_days で sort
                $sorted = array_values(Arr::sort($entity->days, function ($value) {
                    return $value['diff_days'];
                }));
                unset($entities[$key]->days);
                $entities[$key]->days = $sorted;
            }
        }

        return $entities;
    }


    public function index()
    {
        // TODO: ページャは後から。。
        return Entity::where('user_id', auth()->user()->id)
            ->with('days')
            ->orderBy('created_at', 'asc')
            ->get();
            //->paginate(20);
    }


    public function store(Request $request)
    {
        // フォームリクエスト 作ってもいいけどコレで
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'nullable|string'
        ]);

        $entity = new Entity();
        $entity->user_id = auth()->user()->id;
        $entity->name = $validatedData['name'];
        $entity->desc = $validatedData['desc'];
        $entity->save();

        return $entity;
    }


    public function show(Entity $entity)
    {
        return $entity->load('days');
    }


    public function update(Request $request, Entity $entity)
    {
        // フォームリクエスト 作ってもいいけどコレで
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'nullable|string'
        ]);

        $entity->name = $validatedData['name'];
        $entity->desc = $validatedData['desc'];
        $entity->save();

        return $entity;
    }


    public function destroy(Entity $entity)
    {
        $entity->delete();
        return;
    }
}
