
/// <reference lib="deno.ns" />

import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://showbar.ir",
];

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const secretKeys = JSON.parse(
  Deno.env.get("SUPABASE_SECRET_KEYS")!,
);

const supabaseAdmin = createClient(
  supabaseUrl,
  secretKeys.default,
);

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") ?? "";

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
      ? origin
      : "null",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return Response.json(
        { error: "Method not allowed" },
        {
          status: 405,
          headers: corsHeaders,
        },
      );
    }

    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return Response.json(
        { error: "احراز هویت الزامی است." },
        {
          status: 401,
          headers: corsHeaders,
        },
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return Response.json(
        { error: "کاربر احراز هویت نشده است." },
        {
          status: 401,
          headers: corsHeaders,
        },
      );
    }

    const {
      data: currentUser,
      error: profileError,
    } = await supabaseAdmin
      .from("users")
      .select("id, role")
      .eq("id", user.id)
      .single();

    if (
      profileError ||
      currentUser?.role !== "super_admin"
    ) {
      return Response.json(
        { error: "دسترسی غیرمجاز است." },
        {
          status: 403,
          headers: corsHeaders,
        },
      );
    }

    const body = await req.json();

    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return Response.json(
        { error: "ایمیل الزامی است." },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const {
      data: existingAdmin,
      error: existingAdminError,
    } = await supabaseAdmin
      .from("users")
      .select("id, email, role")
      .eq("email", email)
      .maybeSingle();

    if (existingAdminError) {
      console.error(
        "CHECK EXISTING ADMIN ERROR:",
        existingAdminError,
      );

      return Response.json(
        { error: "بررسی حساب ادمین انجام نشد." },
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    if (existingAdmin) {
      return Response.json(
        {
          error:
            "این کاربر قبلاً به عنوان ادمین انتخاب شده است.",
        },
        {
          status: 409,
          headers: corsHeaders,
        },
      );
    }

    const {
      data,
      error,
    } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      email,
      {
        redirectTo:
          `${Deno.env.get("APP_URL")}/admin/update-password`,
      },
    );

    if (error) {
      console.error("INVITE ERROR:", error);

      return Response.json(
        { error: error.message },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }



    const { error: insertError } = await supabaseAdmin.from("users").insert({
      id: data.user.id,
      email,
      role: "admin",
    });

    if (insertError) {
      console.error(
        "PROFILE INSERT ERROR:",
        insertError,
      );

      await supabaseAdmin.auth.admin.deleteUser(
        data.user.id,
      );

      return Response.json(
        { error: "ساخت پروفایل ادمین انجام نشد." },
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "دعوت‌نامه ادمین ارسال شد.",
      },
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error("CREATE ADMIN ERROR:", error);

    return Response.json(
      { error: "خطای داخلی سرور." },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
});

