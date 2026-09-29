/// <reference lib="deno.ns" />
// deno-lint-ignore-file no-import-prefix

import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://showbar.ir",
];

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;

const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!);

const supabaseAdmin = createClient(supabaseUrl, secretKeys.default);

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") ?? "";

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
      ? origin
      : "null",

    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",

    "Access-Control-Allow-Methods": "POST, OPTIONS",

    "Content-Type": "application/json",
  };

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

    // -------------------------
    // Authenticate current user
    // -------------------------

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
      data: { user: currentAuthUser },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !currentAuthUser) {
      return Response.json(
        { error: "کاربر احراز هویت نشده است." },
        {
          status: 401,
          headers: corsHeaders,
        },
      );
    }

    // -------------------------
    // Check super admin
    // -------------------------

    const { data: currentUser, error: profileError } = await supabaseAdmin
      .from("users")
      .select("id, role")
      .eq("id", currentAuthUser.id)
      .single();

    if (profileError || currentUser?.role !== "super_admin") {
      return Response.json(
        { error: "دسترسی غیرمجاز است." },
        {
          status: 403,
          headers: corsHeaders,
        },
      );
    }

    // -------------------------
    // Request body
    // -------------------------

    const body = await req.json();

    const { action, userId } = body;

    if (!action || !userId) {
      return Response.json(
        {
          error: "عملیات و شناسه کاربر الزامی است.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    // -------------------------
    // Prevent self-management
    // -------------------------

    if (userId === currentAuthUser.id) {
      return Response.json(
        {
          error: "سوپر ادمین نمی‌تواند حساب خودش را تغییر دهد.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    // -------------------------
    // Get target user
    // -------------------------

    const { data: targetUser, error: targetUserError } = await supabaseAdmin
      .from("users")
      .select("id, email, role")
      .eq("id", userId)
      .single();

    if (targetUserError || !targetUser) {
      return Response.json(
        {
          error: "کاربر موردنظر پیدا نشد.",
        },
        {
          status: 404,
          headers: corsHeaders,
        },
      );
    }

    if (targetUser.role === "super_admin") {
      return Response.json(
        {
          error: "امکان مدیریت حساب سوپر ادمین وجود ندارد.",
        },
        {
          status: 403,
          headers: corsHeaders,
        },
      );
    }

    // -------------------------
    // Deactivate
    // -------------------------

    if (action === "deactivate") {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        ban_duration: "876000h",
      });

      if (error) {
        console.error("DEACTIVATE ADMIN ERROR:", error);

        return Response.json(
          {
            error: "غیرفعال کردن ادمین انجام نشد.",
          },
          {
            status: 500,
            headers: corsHeaders,
          },
        );
      }

      return Response.json(
        {
          success: true,
          message: "ادمین غیرفعال شد.",
        },
        {
          status: 200,
          headers: corsHeaders,
        },
      );
    }

    // -------------------------
    // Activate
    // -------------------------

    if (action === "activate") {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        ban_duration: "none",
      });

      if (error) {
        console.error("ACTIVATE ADMIN ERROR:", error);

        return Response.json(
          {
            error: "فعال کردن ادمین انجام نشد.",
          },
          {
            status: 500,
            headers: corsHeaders,
          },
        );
      }

      return Response.json(
        {
          success: true,
          message: "ادمین فعال شد.",
        },
        {
          status: 200,
          headers: corsHeaders,
        },
      );
    }

    // -------------------------
    // Delete
    // -------------------------

    if (action === "delete") {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

      if (error) {
        console.error("DELETE ADMIN ERROR:", error);

        return Response.json(
          {
            error: "حذف ادمین انجام نشد.",
          },
          {
            status: 500,
            headers: corsHeaders,
          },
        );
      }

      return Response.json(
        {
          success: true,
          message: "ادمین حذف شد.",
        },
        {
          status: 200,
          headers: corsHeaders,
        },
      );
    }

    return Response.json(
      {
        error: "عملیات نامعتبر است.",
      },
      {
        status: 400,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error("MANAGE ADMIN ERROR:", error);

    return Response.json(
      {
        error: "خطای داخلی سرور.",
      },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
});
