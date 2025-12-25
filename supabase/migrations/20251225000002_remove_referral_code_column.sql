ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS referral_code TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_referral_code_unique ON public.user_profiles(referral_code) WHERE referral_code IS NOT NULL;

