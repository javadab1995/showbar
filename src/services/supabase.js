import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qgycqwkulgtkuwcjhpzy.supabase.co";
const supabaseKey = "sb_publishable_TO8HXwEo4seSr4FWemSODg_WB70usKT";
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase