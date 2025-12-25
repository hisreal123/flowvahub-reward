-- Create referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  -- Index for referral code lookups
  points_awarded INTEGER DEFAULT 25,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  -- Ensure one referral record per referred user
  UNIQUE(referred_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON public.referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON public.referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referral_code ON public.referrals(referral_code);

-- Enable Row Level Security (RLS)
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can view their own referrals (as referrer)
CREATE POLICY "Users can view their own referrals"
  ON public.referrals
  FOR SELECT
  USING (auth.uid() = referrer_id);

-- Create policy: Users can insert referrals when they are the referred user
CREATE POLICY "Users can insert their own referral record"
  ON public.referrals
  FOR INSERT
  WITH CHECK (auth.uid() = referred_id);

-- Create policy: Users can view referrals where they are the referred user
CREATE POLICY "Users can view their referral record"
  ON public.referrals
  FOR SELECT
  USING (auth.uid() = referred_id);

-- Create function to award points to referrer when referral is created
CREATE OR REPLACE FUNCTION public.award_referral_points()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert points into daily_activity for the referrer
  INSERT INTO public.daily_activity (
    user_id,
    activity_date,
    stress_points,
    reward_points
  )
  VALUES (
    NEW.referrer_id,
    CURRENT_DATE,
    0,
    NEW.points_awarded
  )
  ON CONFLICT (user_id, activity_date) 
  DO UPDATE SET
    reward_points = daily_activity.reward_points + NEW.points_awarded;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically award points
CREATE TRIGGER award_referral_points_trigger
  AFTER INSERT ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.award_referral_points();

