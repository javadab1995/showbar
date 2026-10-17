
import type {
  Company,
  CreateCompanyData,
  UpdateCompanyData,
} from "../types/company";

import supabase from "./supabase";


export async function getCompany(): Promise<Company | null> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data;
}
export async function createCompany(data: CreateCompanyData): Promise<Company> {

  const { data: company, error } = await supabase
    .from("companies")
    .insert({
      name: data.name,
      phone: data.phone || null,
      whatsapp_import: data.whatsapp_import || null,
      whatsapp_export: data.whatsapp_export || null,
      email: data.email || null,
      address: data.address || null,

      rubika_import_url: data.rubika_import_url || null,
      rubika_export_url: data.rubika_export_url || null,
      bale_import_url: data.bale_import_url || null,
      bale_export_url: data.bale_export_url || null,
      eitaa_import_url: data.eitaa_import_url || null,
      eitaa_export_url: data.eitaa_export_url || null,
      instagram: data.instagram || null,
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
      whatsapp_import: data.whatsapp_import || null,
      whatsapp_export: data.whatsapp_export || null,
      email: data.email || null,
      address: data.address || null,

      rubika_import_url: data.rubika_import_url || null,
      rubika_export_url: data.rubika_export_url || null,
      bale_import_url: data.bale_import_url || null,
      bale_export_url: data.bale_export_url || null,
      eitaa_import_url: data.eitaa_import_url || null,
      eitaa_export_url: data.eitaa_export_url || null,
      instagram: data.instagram || null,

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