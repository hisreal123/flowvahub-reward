-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;

-- Allow users to view profiles (needed for referral code lookups)
-- This allows authenticated users to look up profiles by referral_code
CREATE POLICY "Users can view profiles"
  ON public.user_profiles
  FOR SELECT
  USING (true);

