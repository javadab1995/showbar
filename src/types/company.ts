export type Company = {
  id: string;
  admin_id: string;
  name: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateCompanyData = {
  admin_id: string;
  name: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
};

export type UpdateCompanyData = {
  name: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
};
