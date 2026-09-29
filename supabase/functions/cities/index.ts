// deno-lint-ignore-file no-explicit-any
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const GEONAMES_USERNAME = Deno.env.get("GEONAMES_USERNAME");

const ALLOWED_FEATURE_CODES = ["PPLC", "PPLA", "PPLA2", "PPLA3", "PPLA4"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    if (!GEONAMES_USERNAME) {
      throw new Error("GEONAMES_USERNAME is not configured");
    }

    const url = new URL(req.url);

    const country = url.searchParams.get("country")?.trim().toUpperCase();
    const query = url.searchParams.get("query")?.trim();

    if (!country || !query || query.length < 2) {
      return new Response(
        JSON.stringify({
          cities: [],
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const geoNamesUrl = new URL("https://secure.geonames.org/searchJSON");

    geoNamesUrl.searchParams.set("username", GEONAMES_USERNAME);

    geoNamesUrl.searchParams.set("country", country);

    geoNamesUrl.searchParams.set("name_startsWith", query);

    geoNamesUrl.searchParams.set("featureClass", "P");

    geoNamesUrl.searchParams.set("maxRows", "10");

    geoNamesUrl.searchParams.set("orderby", "population");

    geoNamesUrl.searchParams.set("style", "MEDIUM");

   const response = await fetch(geoNamesUrl);

   const data = await response.json();

   if (!response.ok || data.status) {
     console.error("GeoNames error:", data);

     throw new Error(data.status?.message || "GeoNames request failed");
   }
    const cities = (data.geonames ?? [])
     
      .filter((item: any) => ALLOWED_FEATURE_CODES.includes(item.fcode))
      .map((item: any) => ({
        id: item.geonameId,
        name: item.name,
        countryCode: item.countryCode,
        adminName: item.adminName1 || undefined,
        latitude: Number(item.lat),
        longitude: Number(item.lng),
      }));

    return new Response(
      JSON.stringify({
        cities,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }  catch (error) {
  console.error("Cities function error:", error);

  return new Response(
    JSON.stringify({
      message:
        error instanceof Error
          ? error.message
          : "خطای ناشناخته",
      cities: [],
    }),
    {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
}
});
