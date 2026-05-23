<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'subscription_id',
        'merchant_name',
        'amount',
        'currency',
        'charged_at',
        'description',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'charged_at' => 'date',
    ];

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }
}
