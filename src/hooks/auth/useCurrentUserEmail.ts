import { useQuery } from "@tanstack/react-query";
import { getCurrentUserEmail } from "../../services/auth";

export function useCurrentUserEmail() {
  return useQuery({
    queryKey: ["current-user-email"],
    queryFn: getCurrentUserEmail,
  });
}
