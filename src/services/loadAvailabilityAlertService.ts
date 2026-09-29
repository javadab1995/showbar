import supabase from "./supabase";

export type CreateLoadAvailabilityAlertInput = {
  loadId: string;
  name: string;
  mobile: string;
};

export async function createLoadAvailabilityAlert({
  loadId,
  name,
  mobile,
}: CreateLoadAvailabilityAlertInput) {
  const trimmedName = name.trim();
  const normalizedMobile = mobile.trim();

  if (!loadId) {
    throw new Error("شناسه بار معتبر نیست.");
  }

  if (!trimmedName) {
    throw new Error("نام و نام خانوادگی الزامی است.");
  }

  if (!/^09\d{9}$/.test(normalizedMobile)) {
    throw new Error("شماره موبایل معتبر نیست.");
  }

  const { error } = await supabase.from("load_availability_alerts").insert({
    load_id: loadId,
    name: trimmedName,
    mobile: normalizedMobile,
  });

  if (error) {
    console.error("Create load availability alert error:", error);

    if (error.code === "23505") {
      throw new Error(
        "برای این بار قبلاً با این شماره درخواست اطلاع‌رسانی ثبت شده است.",
      );
    }

    throw new Error("ثبت درخواست اطلاع‌رسانی انجام نشد.");
  }

  return {
    success: true,
  };
}
