-- Ensure CASCADE DELETE constraints are in place for user-related data
-- This ensures that when a user is deleted from auth.users, all related data is automatically deleted

-- Ensure daily_activity has CASCADE DELETE
-- Drop existing foreign key if it exists without CASCADE, then recreate with CASCADE
DO $$
BEGIN
  -- Check if constraint exists and doesn't have CASCADE
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu 
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_schema = 'public' 
      AND tc.table_name = 'daily_activity'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'user_id'
  ) THEN
    -- Drop existing constraint
    ALTER TABLE public.daily_activity 
    DROP CONSTRAINT IF EXISTS daily_activity_user_id_fkey;
  END IF;
END $$;

-- Recreate with CASCADE DELETE
ALTER TABLE public.daily_activity
ADD CONSTRAINT daily_activity_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Ensure referrals has CASCADE DELETE for referrer_id
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu 
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_schema = 'public' 
      AND tc.table_name = 'referrals'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'referrer_id'
  ) THEN
    ALTER TABLE public.referrals 
    DROP CONSTRAINT IF EXISTS referrals_referrer_id_fkey;
  END IF;
END $$;

ALTER TABLE public.referrals
ADD CONSTRAINT referrals_referrer_id_fkey 
FOREIGN KEY (referrer_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Ensure referrals has CASCADE DELETE for referred_id
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu 
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_schema = 'public' 
      AND tc.table_name = 'referrals'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'referred_id'
  ) THEN
    ALTER TABLE public.referrals 
    DROP CONSTRAINT IF EXISTS referrals_referred_id_fkey;
  END IF;
END $$;

ALTER TABLE public.referrals
ADD CONSTRAINT referrals_referred_id_fkey 
FOREIGN KEY (referred_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Ensure user_profiles has CASCADE DELETE
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu 
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_schema = 'public' 
      AND tc.table_name = 'user_profiles'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'user_id'
  ) THEN
    ALTER TABLE public.user_profiles 
    DROP CONSTRAINT IF EXISTS user_profiles_user_id_fkey;
  END IF;
END $$;

ALTER TABLE public.user_profiles
ADD CONSTRAINT user_profiles_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

