import { api } from "./api";

export type SubscriptionStatus = "active" | "rarely_used" | "price_increased" | "trial";

export type Subscription = {
  id: number;
  name: string;
  merchant_name?: string | null;
  category: string;
  price: string | number;
  previous_price?: string | number | null;
  currency: string;
  billing_date?: string | null;
  period: string;
  status: SubscriptionStatus;
  confidence: number;
  explanation?: string | null;
  recommendation?: string | null;
  is_important: boolean;
  notifications_enabled: boolean;
  transactions_count?: number;
};

export type AnalyticsSummary = {
  monthly_total: number;
  active_count: number;
  subscriptions_count: number;
  potential_savings: number;
  most_expensive: Subscription[];
  rarely_used: Subscription[];
  categories: Array<{ category: string; total: number; count: number }>;
  insights: Array<{ type: "warning" | "success" | "info"; title: string; description: string }>;
};

export const getSubscriptions = async (): Promise<Subscription[]> => {
  const { data } = await api.get("/subscriptions");
  return data;
};

export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const { data } = await api.get("/analytics/summary");
  return data;
};

export const toggleImportant = async (id: number): Promise<Subscription> => {
  const { data } = await api.post(`/subscriptions/${id}/toggle-important`);
  return data;
};

export const toggleNotifications = async (id: number): Promise<Subscription> => {
  const { data } = await api.post(`/subscriptions/${id}/toggle-notifications`);
  return data;
};

export const hideSubscription = async (id: number): Promise<void> => {
  await api.post(`/subscriptions/${id}/hide`);
};

export const markFalsePositive = async (id: number): Promise<void> => {
  await api.post(`/subscriptions/${id}/mark-false-positive`);
};

export const createSubscription = async (payload: Partial<Subscription>): Promise<Subscription> => {
  const { data } = await api.post("/subscriptions", payload);
  return data;
};
