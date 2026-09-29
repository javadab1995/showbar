import { useMutation } from "@tanstack/react-query";
import { createDriverRequest } from "../../services/apiDrivers";



export function useCreateDriverRequest() {
  return useMutation({
    mutationFn: createDriverRequest,
  });
}
