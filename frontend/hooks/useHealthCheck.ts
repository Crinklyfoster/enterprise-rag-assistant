import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

type HealthResponse = {
  status: string;
};

export function useHealthCheck() {
  return useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await api.get<HealthResponse>("/health");
      return response.data;
    },
  });
}