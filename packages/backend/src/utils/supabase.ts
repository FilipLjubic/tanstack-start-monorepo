import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Minimal server-side admin client for storage/signing operations only.
// Uses service role key; DO NOT expose to frontend.

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
  throw new Error('SUPABASE_URL is not set');
}
if (!serviceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
}

// Use service role to bypass RLS when needed and to sign URLs.
export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export const getPublicUrl = (bucket: string, path: string) => {
  // Public bucket object URL pattern
  return `${url}/storage/v1/object/public/${bucket}/${path}`;
};
