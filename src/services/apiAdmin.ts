import supabase from "../services/supabase";

export async function createAdmin(email: string) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error("دریافت نشست کاربر انجام نشد.");
  }

  if (!session?.access_token) {
    throw new Error("نشست کاربر معتبر نیست.");
  }

  const { data, error } = await supabase.functions.invoke("create-admin", {
    body: {
      email,
    },
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    console.error("create-admin invoke error:", error);

    // پیام واقعی Edge Function
    if ("context" in error && error.context) {
      try {
        const response = error.context as Response;

        const errorData = await response.json();

        if (errorData?.error) {
          throw new Error(errorData.error);
        }
      } catch (contextError) {
        if (contextError instanceof Error) {
          throw contextError;
        }
      }
    }

    throw new Error("ایجاد ادمین انجام نشد.");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}