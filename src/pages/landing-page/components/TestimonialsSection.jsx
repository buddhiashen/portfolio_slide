import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import testimonialsService from '../../../utils/testimonialsService';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [industryStats, setIndustryStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load testimonials
        const testimonialsResult = await testimonialsService.getTestimonials();
        if (testimonialsResult?.success && isMounted) {
          setTestimonials(testimonialsResult.data || []);
        } else if (isMounted) {
          setError(testimonialsResult?.error || 'Failed to load testimonials');
        }

        // Load industry stats
        const statsResult = await testimonialsService.getIndustryStats();
        if (statsResult?.success && isMounted) {
          setIndustryStats(statsResult.data || []);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load testimonials data');
          console.log('Error loading testimonials:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonials?.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const handleTestimonialChange = (index) => {
    setActiveTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleLinkedInClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-error/10 border border-error/20 rounded-lg p-6 max-w-md mx-auto">
              <Icon name="AlertCircle" size={24} color="var(--color-error)" className="mx-auto mb-2" />
              <p className="text-error">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (testimonials?.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-text-secondary">No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium border border-success/20 mb-6">
            <Icon name="MessageSquare" size={16} />
            <span>Success Stories</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Creative Professionals{' '}
            <span className="text-gradient font-accent">Love Our Platform</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Do not just take our word for it. Here is what creative professionals are saying 
            about their portfolio transformation journey.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Testimonial Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="card-surface rounded-2xl p-8 shadow-elevation"
              >
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} color="var(--color-accent)" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed mb-6">
                  "{testimonials[activeTestimonial]?.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src={testimonials[activeTestimonial]?.avatar_url || '/assets/images/no_image.png'}
                    alt={testimonials[activeTestimonial]?.name || 'User'}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-text-primary text-lg">
                      {testimonials[activeTestimonial]?.name}
                    </div>
                    <div className="text-text-secondary">
                      {testimonials[activeTestimonial]?.role}
                    </div>
                    <div className="text-primary text-sm">
                      {testimonials[activeTestimonial]?.company}
                    </div>
                  </div>
                  {testimonials[activeTestimonial]?.linkedin_url && (
                    <button
                      onClick={() => handleLinkedInClick(testimonials[activeTestimonial]?.linkedin_url)}
                      className="ml-auto p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all-fast"
                    >
                      <Icon name="Linkedin" size={20} />
                    </button>
                  )}
                </div>

                {/* Before/After */}
                {testimonials[activeTestimonial]?.before_after && (
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="X" size={16} color="var(--color-error)" />
                        <span className="text-sm font-medium text-error">Before</span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {testimonials[activeTestimonial]?.before_after?.before}
                      </p>
                    </div>
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Check" size={16} color="var(--color-success)" />
                        <span className="text-sm font-medium text-success">After</span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {testimonials[activeTestimonial]?.before_after?.after}
                      </p>
                    </div>
                  </div>
                )}

                {/* Metrics */}
                {testimonials[activeTestimonial]?.metrics && (
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(testimonials[activeTestimonial]?.metrics || {}).map(([key, value], idx) => (
                      <div key={idx} className="text-center p-3 bg-surface rounded-lg">
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-text-secondary capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              More Success Stories
            </h3>
            
            {testimonials?.map((testimonial, index) => (
              <button
                key={testimonial?.id || index}
                onClick={() => handleTestimonialChange(index)}
                className={`w-full text-left p-4 rounded-lg transition-all-fast ${
                  index === activeTestimonial
                    ? 'bg-primary/10 border-2 border-primary/30' :'bg-surface hover:bg-surface-hover border border-subtle'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={testimonial?.avatar_url || '/assets/images/no_image.png'}
                    alt={testimonial?.name || 'User'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-text-primary text-sm">
                      {testimonial?.name}
                    </div>
                    <div className="text-xs text-text-secondary truncate">
                      {testimonial?.role}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial?.rating || 5)].map((_, i) => (
                      <Icon key={i} name="Star" size={12} color="var(--color-accent)" />
                    ))}
                  </div>
                </div>
              </button>
            ))}

            {/* Auto-play Control */}
            <div className="pt-4 border-t border-subtle">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-all-fast"
              >
                <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
                <span>{isAutoPlaying ? "Pause" : "Play"} Auto-rotation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Industry Statistics */}
        {industryStats?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                Trusted Across Creative Industries
              </h3>
              <p className="text-text-secondary">
                See how different creative professionals are succeeding with Portfolio Slide
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryStats?.map((stat, index) => (
                <motion.div
                  key={stat?.id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-surface rounded-lg p-6 border border-subtle"
                >
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat?.user_count}
                  </div>
                  <div className="text-sm text-text-primary font-medium mb-2">
                    {stat?.industry}
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name="Star" size={14} color="var(--color-accent)" />
                    <span className="text-sm text-text-secondary">{stat?.satisfaction_score}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;