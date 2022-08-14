<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issues', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id')
                ->references('id')->on('projects')
                ->unsigned()
                ->index()
                ->nullable();
            $table
                ->string('subject', 255)
                ->comment('題名');
            $table
                ->text('body')
                ->nullable()
                ->comment('内容');
            $table->unsignedTinyInteger('status_id')
                ->unsigned()
                ->default(1)
                ->comment('状態');
            $table->unsignedTinyInteger('priority_id')
                ->unsigned()
                ->nullable()
                ->comment('優先度');
            $table->timestamp('due_at')
                ->nullable()
                ->comment('期限');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issues');
    }
};
