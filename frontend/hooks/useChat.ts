import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { sendMessage } from "@/lib/chat";

export function useChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
  });
}
