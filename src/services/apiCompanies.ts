
import type {
  Company,
  CreateCompanyData,
  UpdateCompanyData,
} from "../types/company";
import supabase from "./supabase";

export async function getCompanies(adminId: string): Promise<Company[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("admin_id", adminId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createCompany(data: CreateCompanyData): Promise<Company> {
  const { data: company, error } = await supabase
    .from("companies")
    .insert({
      admin_id: data.admin_id,
      name: data.name,
      phone: data.phone || null,
      whatsapp: data.whatsapp || null,
      email: data.email || null,
      address: data.address || null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return company;
}

export async function updateCompany(
  id: string,
  data: UpdateCompanyData,
): Promise<Company> {
  const { data: company, error } = await supabase
    .from("companies")
    .update({
      name: data.name,
      phone: data.phone || null,
      whatsapp: data.whatsapp || null,
      email: data.email || null,
      address: data.address || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return company;
}
