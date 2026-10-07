import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCompany,
  getCompany,
  updateCompany,
} from "../../services/apiCompanies";

import type { CreateCompanyData, UpdateCompanyData } from "../../types/company";

export function useCompany() {
  return useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCompanyData) => createCompany(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company"],
      });
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCompanyData }) =>
      updateCompany(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company"],
      });
    },
  });
}
