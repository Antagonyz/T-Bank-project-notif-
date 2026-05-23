<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'price',
        'previous_price',
        'currency',
        'billing_date',
        'period',
        'status',
        'confidence',
        'explanation',
        'recommendation',
        'is_important',
        'notifications_enabled',
        'is_false_positive',
        'is_hidden',
        'trial_ends_at',
        'last_transaction_at',
        'merchant_name',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'previous_price' => 'decimal:2',
        'billing_date' => 'date',
        'trial_ends_at' => 'date',
        'last_transaction_at' => 'date',
        'is_important' => 'boolean',
        'notifications_enabled' => 'boolean',
        'is_false_positive' => 'boolean',
        'is_hidden' => 'boolean',
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
