import supabase from "./supabase";


export async function getMyRequests(trackingCode: string) {
  const { data, error } = await supabase.rpc("get_my_requests", {
    p_tracking_code: trackingCode,
  });

  if (error) {
    throw error;
  }

  return data;
}