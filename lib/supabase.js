import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hicowukbjsbpuebquqbh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpY293dWtianNicHVlYnF1cWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzgyNzQsImV4cCI6MjA4NzU1NDI3NH0.sz7ZNU3-WcsskIaHC5Cjs_-WVmXLtYR15Iy8VGi8ch0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
