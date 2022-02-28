<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEntitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entities', function (Blueprint $table) {
            $table->bigIncrements('id');
            // ユーザ名ID
            $table->unsignedBigInteger('user_id');
            // 要素名(グループ名)
            $table->string('name',255);
            // 説明
            $table->text('desc')->nullable();
            // ステータス(listに出すか)
            $table->unsignedTinyInteger('status')->default(0);
            // 作成日、更新日
            $table->timestamps();
            // 論理削除
            $table->softDeletes();
        });

        Schema::table('entities', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entities');
    }
}
