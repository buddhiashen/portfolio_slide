-- Location: supabase/migrations/20241216120000_auth_and_testimonials.sql
-- Portfolio Slide - Authentication and Testimonials Module

-- 1. Custom Types
CREATE TYPE public.user_role AS ENUM ('admin', 'user', 'moderator');
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');

-- 2. User Profiles Table (Critical intermediary for auth relationships)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'user'::public.user_role,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Testimonials Table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    avatar_url TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    quote TEXT NOT NULL,
    metrics JSONB DEFAULT '{}',
    before_after JSONB DEFAULT '{}',
    linkedin_url TEXT,
    status public.content_status DEFAULT 'published'::public.content_status,
    display_order INTEGER DEFAULT 0,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Industry Statistics Table
CREATE TABLE public.industry_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    industry TEXT NOT NULL,
    user_count TEXT NOT NULL,
    satisfaction_score TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    status public.content_status DEFAULT 'published'::public.content_status,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_testimonials_status ON public.testimonials(status);
CREATE INDEX idx_testimonials_display_order ON public.testimonials(display_order);
CREATE INDEX idx_testimonials_created_by ON public.testimonials(created_by);
CREATE INDEX idx_industry_stats_status ON public.industry_stats(status);
CREATE INDEX idx_industry_stats_display_order ON public.industry_stats(display_order);

-- 6. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_stats ENABLE ROW LEVEL SECURITY;

-- 7. Helper Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
)
$$;

CREATE OR REPLACE FUNCTION public.can_manage_content()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role IN ('admin', 'moderator')
)
$$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'user'::public.user_role)
  );  
  RETURN NEW;
END;
$$;

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 8. Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. RLS Policies
-- User Profiles Policies
CREATE POLICY "users_view_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "admins_manage_all_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Testimonials Policies
CREATE POLICY "public_view_published_testimonials"
ON public.testimonials
FOR SELECT
TO public
USING (status = 'published'::public.content_status);

CREATE POLICY "content_managers_manage_testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (public.can_manage_content())
WITH CHECK (public.can_manage_content());

-- Industry Stats Policies
CREATE POLICY "public_view_published_industry_stats"
ON public.industry_stats
FOR SELECT
TO public
USING (status = 'published'::public.content_status);

CREATE POLICY "content_managers_manage_industry_stats"
ON public.industry_stats
FOR ALL
TO authenticated
USING (public.can_manage_content())
WITH CHECK (public.can_manage_content());

-- 10. Sample Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    user_uuid UUID := gen_random_uuid();
    testimonial1_id UUID := gen_random_uuid();
    testimonial2_id UUID := gen_random_uuid();
    testimonial3_id UUID := gen_random_uuid();
    testimonial4_id UUID := gen_random_uuid();
    testimonial5_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@portfolioslide.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'user@portfolioslide.com', crypt('user123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Regular User"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Insert testimonials data
    INSERT INTO public.testimonials (id, name, role, company, avatar_url, rating, quote, metrics, before_after, linkedin_url, display_order, created_by) VALUES
        (testimonial1_id, 'Sarah Chen', 'Freelance Photographer', 'Chen Photography Studio',
         'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
         5, 'Portfolio Slide transformed my business completely. I went from spending entire weekends updating my portfolio to doing it in minutes. My client inquiries increased by 300% within the first month.',
         '{"clientIncrease": "300%", "timeSaved": "15 hours/week", "revenue": "$25K additional"}'::jsonb,
         '{"before": "Static website, hard to update", "after": "Dynamic portfolio, instant updates"}'::jsonb,
         'https://linkedin.com/in/sarahchen-photo', 1, admin_uuid),
        
        (testimonial2_id, 'Marcus Rodriguez', 'Creative Director', 'Pixel Perfect Agency',
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
         5, 'As an agency, we needed something that could showcase multiple projects beautifully. Portfolio Slide CMS made it effortless to keep our work current. We have won 3 major clients just from our portfolio alone.',
         '{"clientIncrease": "150%", "projectValue": "$85K won", "teamEfficiency": "40% faster"}'::jsonb,
         '{"before": "Outdated agency website", "after": "Modern, dynamic showcase"}'::jsonb,
         'https://linkedin.com/in/marcusrodriguez-creative', 2, admin_uuid),
        
        (testimonial3_id, 'Emily Watson', 'UX/UI Designer', 'Independent Consultant',
         'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
         5, 'The mobile responsiveness is incredible. My clients can view my work perfectly on any device. The analytics showed me that 70% of my traffic comes from mobile - I would have lost those clients with my old portfolio.',
         '{"mobileTraffic": "70%", "clientSatisfaction": "4.9/5", "conversionRate": "35% higher"}'::jsonb,
         '{"before": "Desktop-only portfolio", "after": "Mobile-first experience"}'::jsonb,
         'https://linkedin.com/in/emilywatson-ux', 3, admin_uuid),
        
        (testimonial4_id, 'David Kim', 'Brand Designer', 'Kim Creative Solutions',
         'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
         5, 'The template quality is outstanding. I look more professional than agencies twice my size. The drag-and-drop interface means I can update my portfolio between client meetings. It has been a game-changer.',
         '{"professionalImage": "95% improved", "updateSpeed": "5 minutes", "clientRetention": "90%"}'::jsonb,
         '{"before": "Basic template design", "after": "Professional brand presence"}'::jsonb,
         'https://linkedin.com/in/davidkim-brand', 4, admin_uuid),
        
        (testimonial5_id, 'Lisa Thompson', 'Graphic Designer', 'Thompson Design Co.',
         'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
         5, 'I was losing clients because my portfolio took forever to load. Portfolio Slide optimization is incredible - under 3 seconds every time. My bounce rate dropped by 60% and inquiries doubled.',
         '{"loadTime": "<3 seconds", "bounceRate": "60% reduction", "inquiries": "200% increase"}'::jsonb,
         '{"before": "Slow loading portfolio", "after": "Lightning fast experience"}'::jsonb,
         'https://linkedin.com/in/lisathompson-design', 5, admin_uuid);

    -- Insert industry statistics
    INSERT INTO public.industry_stats (industry, user_count, satisfaction_score, display_order) VALUES
        ('Photography', '3,247', '4.9/5', 1),
        ('Design Agencies', '2,156', '4.8/5', 2),
        ('Freelance Designers', '4,891', '4.9/5', 3),
        ('Creative Consultants', '1,553', '4.8/5', 4);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 11. Cleanup Function
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs first
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@portfolioslide.com';

    -- Delete in dependency order (children first, then auth.users last)
    DELETE FROM public.testimonials WHERE created_by = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);

    -- Delete auth.users last (after all references are removed)
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);
    
    -- Delete industry stats
    DELETE FROM public.industry_stats;
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;