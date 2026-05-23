<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function summary(): JsonResponse
    {
        $subscriptions = Subscription::query()
            ->where('is_hidden', false)
            ->where('is_false_positive', false)
            ->get();

        $monthlyTotal = $subscriptions->sum('price');
        $activeCount = $subscriptions->where('status', 'active')->count();
        $expensive = $subscriptions->sortByDesc('price')->take(3)->values();
        $rarelyUsed = $subscriptions->where('status', 'rarely_used')->values();
        $potentialSavings = $rarelyUsed->sortByDesc('price')->take(2)->sum('price');

        $categories = $subscriptions
            ->groupBy('category')
            ->map(fn ($items, $category) => [
                'category' => $category,
                'total' => round($items->sum('price'), 2),
                'count' => $items->count(),
            ])
            ->values();

        return response()->json([
            'monthly_total' => round($monthlyTotal, 2),
            'active_count' => $activeCount,
            'subscriptions_count' => $subscriptions->count(),
            'potential_savings' => round($potentialSavings, 2),
            'most_expensive' => $expensive,
            'rarely_used' => $rarelyUsed,
            'categories' => $categories,
            'insights' => $this->buildInsights($subscriptions, $monthlyTotal, $potentialSavings),
        ]);
    }

    public function notifications(): JsonResponse
    {
        $today = Carbon::today();

        $subscriptions = Subscription::query()
            ->where('is_hidden', false)
            ->where('is_false_positive', false)
            ->where('notifications_enabled', true)
            ->whereNotNull('billing_date')
            ->orderBy('billing_date')
            ->get();

        $notifications = $subscriptions->map(function (Subscription $subscription) use ($today) {
            $billingDate = Carbon::parse($subscription->billing_date);
            $daysLeft = $today->diffInDays($billingDate, false);

            $message = match ($subscription->status) {
                'price_increased' => "Стоимость {$subscription->name} выросла с {$subscription->previous_price} {$subscription->currency} до {$subscription->price} {$subscription->currency}",
                'rarely_used' => "{$subscription->name} выглядит редко используемой подпиской",
                'trial' => "Скоро первое платное списание по {$subscription->name}",
                default => "Через {$daysLeft} дн. спишется {$subscription->price} {$subscription->currency} за {$subscription->name}",
            };

            return [
                'id' => $subscription->id,
                'subscription_id' => $subscription->id,
                'name' => $subscription->name,
                'message' => $message,
                'days_left' => $daysLeft,
                'status' => $subscription->status,
            ];
        })->values();

        return response()->json($notifications);
    }

    private function buildInsights($subscriptions, float $monthlyTotal, float $potentialSavings): array
    {
        $count = $subscriptions->count();
        $top = $subscriptions->sortByDesc('price')->first();
        $rareCount = $subscriptions->where('status', 'rarely_used')->count();

        return [
            [
                'type' => 'info',
                'title' => 'Общие расходы на подписки',
                'description' => "Сейчас найдено {$count} подписок на сумму ".round($monthlyTotal)." ₽ в месяц.",
            ],
            [
                'type' => 'warning',
                'title' => 'Самая дорогая подписка',
                'description' => $top ? "{$top->name} — {$top->price} ₽ в месяц. Проверьте, действительно ли она нужна." : 'Пока нет данных.',
            ],
            [
                'type' => 'success',
                'title' => 'Потенциальная экономия',
                'description' => $rareCount > 0
                    ? "Можно сэкономить до ".round($potentialSavings)." ₽, если отключить 1–2 редко используемые подписки."
                    : 'Редко используемых подписок не найдено.',
            ],
        ];
    }
}
