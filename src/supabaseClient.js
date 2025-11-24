
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://inphfapjnmfedemyntlq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucGhmYXBqbm1mZWRlbXludGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NjU1NjksImV4cCI6MjA3OTU0MTU2OX0.O4Nsi9QzpQJvQN5zEbF17upGfN-melPPsQBBUIHSprg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
