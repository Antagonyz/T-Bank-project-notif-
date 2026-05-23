<?php

namespace Database\Seeders;

use App\Models\Subscription;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'name' => 'КиноПлюс',
                'merchant_name' => 'KINOPLUS',
                'category' => 'Кино и сериалы',
                'price' => 499,
                'previous_price' => 399,
                'billing_date' => Carbon::today()->addDays(2),
                'status' => 'price_increased',
                'confidence' => 94,
                'explanation' => 'Найдено регулярное списание раз в месяц. Цена выросла относительно прошлых платежей.',
                'recommendation' => 'Проверьте тариф: возможно, выгоднее перейти на годовую оплату или отключить подписку.',
                'last_transaction_at' => Carbon::today()->subDays(28),
            ],
            [
                'name' => 'Музыка T',
                'merchant_name' => 'T MUSIC',
                'category' => 'Музыка',
                'price' => 299,
                'billing_date' => Carbon::today()->addDays(5),
                'status' => 'active',
                'confidence' => 91,
                'is_important' => true,
                'explanation' => 'Списание повторяется стабильно, сумма не меняется.',
                'recommendation' => 'Подписка выглядит регулярной и активной.',
                'last_transaction_at' => Carbon::today()->subDays(25),
            ],
            [
                'name' => 'Cloud Box',
                'merchant_name' => 'CLOUD BOX',
                'category' => 'Облако',
                'price' => 999,
                'billing_date' => Carbon::today()->addDays(1),
                'status' => 'active',
                'confidence' => 88,
                'explanation' => 'Повторяющееся списание за облачное хранилище.',
                'recommendation' => 'Проверьте объём хранилища: возможно, хватит меньшего тарифа.',
                'last_transaction_at' => Carbon::today()->subDays(29),
            ],
            [
                'name' => 'EduStart',
                'merchant_name' => 'EDUSTART',
                'category' => 'Образование',
                'price' => 1490,
                'billing_date' => Carbon::today()->addDays(10),
                'status' => 'rarely_used',
                'confidence' => 82,
                'explanation' => 'Есть регулярное списание, но последние платежи не связаны с активными действиями пользователя.',
                'recommendation' => 'Если курс уже пройден, отключение даст заметную экономию.',
                'last_transaction_at' => Carbon::today()->subDays(59),
            ],
            [
                'name' => 'Game Pass',
                'merchant_name' => 'GAME PASS',
                'category' => 'Игры',
                'price' => 799,
                'billing_date' => Carbon::today()->addDays(3),
                'status' => 'rarely_used',
                'confidence' => 77,
                'explanation' => 'Подписка списывается ежемесячно, но выглядит сомнительно полезной по простым признакам.',
                'recommendation' => 'Можно временно отключить и вернуть при необходимости.',
                'last_transaction_at' => Carbon::today()->subDays(52),
            ],
            [
                'name' => 'Fitness Online',
                'merchant_name' => 'FIT ONLINE',
                'category' => 'Здоровье',
                'price' => 690,
                'billing_date' => Carbon::today()->addDays(14),
                'status' => 'trial',
                'confidence' => 73,
                'trial_ends_at' => Carbon::today()->addDays(3),
                'explanation' => 'После пробного периода ожидается первое платное списание.',
                'recommendation' => 'Решите заранее, нужна ли подписка после триала.',
                'last_transaction_at' => Carbon::today()->subDays(11),
            ],
        ];

        foreach ($items as $item) {
            $subscription = Subscription::create(array_merge([
                'currency' => '₽',
                'period' => 'monthly',
                'notifications_enabled' => true,
            ], $item));

            foreach ([90, 60, 30] as $daysAgo) {
                Transaction::create([
                    'subscription_id' => $subscription->id,
                    'merchant_name' => $subscription->merchant_name ?? $subscription->name,
                    'amount' => $daysAgo === 30 ? $subscription->price : ($subscription->previous_price ?? $subscription->price),
                    'currency' => '₽',
                    'charged_at' => Carbon::today()->subDays($daysAgo),
                    'description' => 'Регулярное списание '.$subscription->name,
                ]);
            }
        }
    }
}
