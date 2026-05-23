<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json([
    'status' => 'ok',
    'service' => 't-bank-subscriptions-api',
]));

Route::apiResource('subscriptions', SubscriptionController::class)->except(['create', 'edit']);
Route::post('/subscriptions/{subscription}/toggle-important', [SubscriptionController::class, 'toggleImportant']);
Route::post('/subscriptions/{subscription}/toggle-notifications', [SubscriptionController::class, 'toggleNotifications']);
Route::post('/subscriptions/{subscription}/mark-false-positive', [SubscriptionController::class, 'markFalsePositive']);
Route::post('/subscriptions/{subscription}/hide', [SubscriptionController::class, 'hide']);

Route::get('/analytics/summary', [AnalyticsController::class, 'summary']);
Route::get('/notifications', [AnalyticsController::class, 'notifications']);
