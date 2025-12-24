-- Create daily_activity table
CREATE TABLE IF NOT EXISTS public.daily_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  stress_points INTEGER DEFAULT 0,
  reward_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  -- Ensure one activity record per user per day
  UNIQUE(user_id, activity_date)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_activity_user_id ON public.daily_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_activity_activity_date ON public.daily_activity(activity_date);
CREATE INDEX IF NOT EXISTS idx_daily_activity_user_date ON public.daily_activity(user_id, activity_date);

-- Enable Row Level Security (RLS)
ALTER TABLE public.daily_activity ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own activities
CREATE POLICY "Users can view their own daily activities"
  ON public.daily_activity
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own activities
CREATE POLICY "Users can insert their own daily activities"
  ON public.daily_activity
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own activities
CREATE POLICY "Users can update their own daily activities"
  ON public.daily_activity
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy: Users can delete their own activities
CREATE POLICY "Users can delete their own daily activities"
  ON public.daily_activity
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.daily_activity
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

