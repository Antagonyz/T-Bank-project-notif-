<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SubscriptionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Subscription::query()
            ->where('is_hidden', false)
            ->where('is_false_positive', false);

        if ($request->boolean('important')) {
            $query->where('is_important', true);
        }

        return response()->json(
            $query
                ->withCount('transactions')
                ->orderByDesc('is_important')
                ->orderBy('billing_date')
                ->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $this->validateSubscription($request);
        $validated['status'] = $validated['status'] ?? $this->resolveStatus($validated);
        $validated['confidence'] = $validated['confidence'] ?? 70;
        $validated['explanation'] = $validated['explanation'] ?? 'Добавлено вручную пользователем.';

        $subscription = Subscription::create($validated);

        return response()->json($subscription->loadCount('transactions'), 201);
    }

    public function show(Subscription $subscription): JsonResponse
    {
        return response()->json($subscription->load('transactions'));
    }

    public function update(Request $request, Subscription $subscription): JsonResponse
    {
        $validated = $this->validateSubscription($request, true);
        if (array_key_exists('price', $validated) || array_key_exists('billing_date', $validated)) {
            $validated['status'] = $validated['status'] ?? $this->resolveStatus(array_merge($subscription->toArray(), $validated));
        }

        $subscription->update($validated);

        return response()->json($subscription->fresh()->loadCount('transactions'));
    }

    public function destroy(Subscription $subscription): JsonResponse
    {
        $subscription->delete();

        return response()->json(['message' => 'Подписка удалена']);
    }

    public function toggleImportant(Subscription $subscription): JsonResponse
    {
        $subscription->update(['is_important' => ! $subscription->is_important]);

        return response()->json($subscription->fresh()->loadCount('transactions'));
    }

    public function toggleNotifications(Subscription $subscription): JsonResponse
    {
        $subscription->update(['notifications_enabled' => ! $subscription->notifications_enabled]);

        return response()->json($subscription->fresh()->loadCount('transactions'));
    }

    public function markFalsePositive(Subscription $subscription): JsonResponse
    {
        $subscription->update(['is_false_positive' => true]);

        return response()->json(['message' => 'Подписка помечена как ошибочно определённая']);
    }

    public function hide(Subscription $subscription): JsonResponse
    {
        $subscription->update(['is_hidden' => true]);

        return response()->json(['message' => 'Подписка скрыта']);
    }

    private function validateSubscription(Request $request, bool $partial = false): array
    {
        $rule = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'name' => [$rule, 'string', 'max:255'],
            'merchant_name' => ['nullable', 'string', 'max:255'],
            'category' => ['sometimes', 'string', 'max:80'],
            'price' => [$rule, 'numeric', 'min:0'],
            'previous_price' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['sometimes', 'string', 'max:8'],
            'billing_date' => ['nullable', 'date'],
            'period' => ['sometimes', Rule::in(['weekly', 'monthly', 'yearly'])],
            'status' => ['sometimes', Rule::in(['active', 'rarely_used', 'price_increased', 'trial'])],
            'confidence' => ['sometimes', 'integer', 'min:0', 'max:100'],
            'explanation' => ['nullable', 'string'],
            'recommendation' => ['nullable', 'string'],
            'is_important' => ['sometimes', 'boolean'],
            'notifications_enabled' => ['sometimes', 'boolean'],
            'trial_ends_at' => ['nullable', 'date'],
            'last_transaction_at' => ['nullable', 'date'],
        ]);
    }

    private function resolveStatus(array $data): string
    {
        if (! empty($data['trial_ends_at'])) {
            return 'trial';
        }

        if (! empty($data['previous_price']) && (float) $data['price'] > (float) $data['previous_price']) {
            return 'price_increased';
        }

        return 'active';
    }
}
