import supabase from "./supabase";

export type AdminUser = {
  id: string;
  email: string;
  role: "admin" | "super_admin";
  created_at: string;
  last_sign_in_at: string | null;
  banned_until: string | null;
};
export async function getUsers(): Promise<AdminUser[]> {
  const { data, error } = await supabase.rpc("get_admin_users");
  if (error) {
    console.error("GET ADMIN USERS ERROR:", error);
    throw error;
  }
  return data ?? [];
}

export type AdminAction = "activate" | "deactivate" | "delete";

export async function manageAdmin(userId: string, action: AdminAction) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("نشست کاربر معتبر نیست.");
  }

  const { data, error } = await supabase.functions.invoke("manage-admin", {
    body: {
      action,
      userId,
    },
  });

  if (error) {
    throw error;
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}