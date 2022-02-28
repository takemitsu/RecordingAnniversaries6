<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('days', function (Blueprint $table) {
            $table->bigIncrements('id');
            // 要素(グループ)ID
            $table->unsignedBigInteger('entity_id');
            // 名前
            $table->string('name',255);
            // 説明
            $table->text('desc')->nullable();
            // 日付
            $table->date('anniv_at');
            // 作成日、更新日
            $table->timestamps();
            // 論理削除
            $table->softDeletes();
        });

        Schema::table('days', function (Blueprint $table) {
            $table->foreign('entity_id')->references('id')->on('entities')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('days');
    }
}
