import { api } from "./api";

export const getSubscriptions = async () => {
  const { data } = await api.get("/subscriptions");
  return data;
};