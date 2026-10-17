export type Company = {
  id: string;
  name: string;
  phone: string | null;
  whatsapp_import: string | null;
  whatsapp_export: string | null;
  email: string | null;
  address: string | null;

  rubika_import_url: string | null;
  rubika_export_url: string | null;
  bale_import_url: string | null;
  bale_export_url: string | null;
  eitaa_import_url: string | null;
  eitaa_export_url: string | null;
  instagram: string | null;

  created_at: string;
  updated_at: string;
};

export type CreateCompanyData = {
  name: string;
  phone?: string;
  whatsapp_import?: string;
  whatsapp_export?: string;
  email?: string;
  address?: string;

  rubika_import_url?: string;
  rubika_export_url?: string;
  bale_import_url?: string;
  bale_export_url?: string;
  eitaa_import_url?: string;
  eitaa_export_url?: string;
  instagram?: string;
};

export type UpdateCompanyData = {
  name: string;
  phone?: string;
  whatsapp_import?: string;
  whatsapp_export?: string;
  email?: string;
  address?: string;

  rubika_import_url?: string;
  rubika_export_url?: string;
  bale_import_url?: string;
  bale_export_url?: string;
  eitaa_import_url?: string;
  eitaa_export_url?: string;
  instagram?: string;
};
