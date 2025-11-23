
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pyeefbssdgedhifudsar.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWVmYnNzZGdlZGhpZnVkc2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzgzMTMsImV4cCI6MjA2NTkxNDMxM30.-1CNoKdasGpTud1feKiYknrCvhxJTJ7aKuQXn7L5BAs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
