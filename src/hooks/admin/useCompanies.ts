import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCompany,
  getCompanies,
  updateCompany,
} from "../../services/apiCompanies";

import type { CreateCompanyData, UpdateCompanyData } from "../../types/company";

export function useCompanies(adminId?: string) {
  return useQuery({
    queryKey: ["companies", adminId],
    queryFn: () => getCompanies(adminId!),
    enabled: Boolean(adminId),
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCompanyData) => createCompany(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["companies", variables.admin_id],
      });
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCompanyData }) =>
      updateCompany(id, data),

    onSuccess: (company) => {
      queryClient.invalidateQueries({
        queryKey: ["companies", company.admin_id],
      });
    },
  });
}
