import { useUserStore } from "@/stores";
export function getStore() {
  const store = useUserStore();
  return store;
}
