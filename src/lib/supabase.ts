
import { createClient } from '@supabase/supabase-js';

// Use direct values from the Supabase project
const supabaseUrl = "https://veynoptrpdbdcmpceacj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleW5vcHRycGRiZGNtcGNlYWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NTAyNTgsImV4cCI6MjA2MzEyNjI1OH0.MfOAn1I5yleTbYqK0fQJIxl4ZLvEgaCua_Zz87WNVUY";

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
