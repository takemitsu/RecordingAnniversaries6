<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Days extends Model
{
    use SoftDeletes;

    public function Entity()
    {
        return $this->belongsTo('App\Models\Entity');
    }

    protected $appends = ['diff_days'];

    public function getDiffDaysAttribute()
    {
        return $this->diff();
    }

    /**
     * 今日から何日か
     * @return int
     */
    public function diff()
    {
        if ($this->anniv_at == null) {
            return null;
        }

        $dt = Carbon::createFromFormat('Y-m-d', $this->anniv_at);
        $now = Carbon::now();
        $now->setTime(0, 0, 0, 0);

        // 未来日か
        if ($dt >= $now) {
            return $dt->diffInDays();
        }

        // 過去日なら
        $dt->setYear($now->year);
        if ($dt > $now) {
            return $dt->diffInDays();
        }
        // 今年はもう終わっていたら
        $dt->addYear();
        return $dt->diffInDays();
    }
}
