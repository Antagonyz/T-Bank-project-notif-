<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('merchant_name')->nullable();
            $table->string('category')->default('Сервис');
            $table->decimal('price', 10, 2);
            $table->decimal('previous_price', 10, 2)->nullable();
            $table->string('currency', 8)->default('₽');
            $table->date('billing_date')->nullable();
            $table->string('period')->default('monthly');
            $table->string('status')->default('active');
            $table->unsignedTinyInteger('confidence')->default(75);
            $table->text('explanation')->nullable();
            $table->text('recommendation')->nullable();
            $table->boolean('is_important')->default(false);
            $table->boolean('notifications_enabled')->default(true);
            $table->boolean('is_false_positive')->default(false);
            $table->boolean('is_hidden')->default(false);
            $table->date('trial_ends_at')->nullable();
            $table->date('last_transaction_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
