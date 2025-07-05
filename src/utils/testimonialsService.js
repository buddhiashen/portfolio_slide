import { supabase } from '../config/supabase';

const testimonialsService = {
  // Get all published testimonials
  getTestimonials: async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.',
          data: []
        };
      }
      
      return { 
        success: false, 
        error: 'Failed to load testimonials',
        data: []
      };
    }
  },

  // Get industry statistics
  getIndustryStats: async () => {
    try {
      const { data, error } = await supabase
        .from('industry_stats')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.',
          data: []
        };
      }
      
      return { 
        success: false, 
        error: 'Failed to load industry statistics',
        data: []
      };
    }
  },

  // Create new testimonial (admin only)
  createTestimonial: async (testimonialData) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonialData])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      
      return { 
        success: false, 
        error: 'Failed to create testimonial' 
      };
    }
  },

  // Update testimonial (admin only)
  updateTestimonial: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      
      return { 
        success: false, 
        error: 'Failed to update testimonial' 
      };
    }
  },

  // Delete testimonial (admin only)
  deleteTestimonial: async (id) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      
      return { 
        success: false, 
        error: 'Failed to delete testimonial' 
      };
    }
  },

  // Subscribe to testimonials changes
  subscribeToTestimonials: (callback) => {
    const subscription = supabase
      .channel('testimonials')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'testimonials' },
        callback
      )
      .subscribe();

    return subscription;
  },

  // Unsubscribe from changes
  unsubscribeFromTestimonials: (subscription) => {
    if (subscription) {
      supabase.removeChannel(subscription);
    }
  }
};

export default testimonialsService;