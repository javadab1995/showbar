import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qgycqwkulgtkuwcjhpzy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWNxd2t1bGd0a3V3Y2pocHp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNzM0NzAsImV4cCI6MjEwMzg0OTQ3MH0.zrt7g - Oksm1qm_CP0wNv2UYhEgxz_LRh1q9iDs0nBwk"
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase