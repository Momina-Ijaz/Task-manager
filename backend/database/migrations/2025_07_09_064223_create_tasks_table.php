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
    Schema::create('tasks', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('description')->nullable();
        $table->enum('status', ['to_do', 'in_progress', 'done']);
        $table->unsignedBigInteger('assigned_user_id')->nullable();
        $table->unsignedBigInteger('project_id')->nullable();
        $table->timestamps();

        $table->foreign('assigned_user_id')->references('id')->on('users')->nullOnDelete();
        $table->foreign('project_id')->references('id')->on('projects')->nullOnDelete();
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
