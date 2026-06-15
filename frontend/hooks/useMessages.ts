import { useQuery } from "@tanstack/react-query";

import { getMessages } from "@/lib/chat";

export function useMessages(sessionId: string) {
  return useQuery({
    queryKey: ["messages", sessionId],
    queryFn: () => getMessages(sessionId),
    enabled: !!sessionId,
  });
}
