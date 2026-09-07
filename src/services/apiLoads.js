import supabase from "./supabase";

export async function getLoads() {
    const { data: loads, error } = await supabase
        .from("loads")
        .select("*");

  if (error) {
    console.log(error);
    throw new Error("دریافت بارها با مشکل مواجه شده است");
  }
  return loads;
}

export async function createLoad(load) {
  const { data, error } = await supabase
    .from("loads")
    .insert([load])
    .select();

  if (error) {
    console.log(error);
    throw new Error("ایجاد بار با مشکل مواجه شده است");
    }
    return data
}
