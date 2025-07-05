import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const portfolioSamples = [
    {
      id: 1,
      title: "Brand Identity Design",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      client: "TechStart Inc.",
      description: "Complete brand identity system with logo, colors, and guidelines"
    },
    {
      id: 2,
      title: "E-commerce Website",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      client: "Fashion Forward",
      description: "Modern e-commerce platform with seamless user experience"
    },
    {
      id: 3,
      title: "Mobile App UI/UX",
      category: "App Design",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      client: "HealthTech Solutions",
      description: "Intuitive mobile app design for healthcare management"
    },
    {
      id: 4,
      title: "Photography Portfolio",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop",
      client: "Creative Studios",
      description: "Professional photography showcase with dynamic galleries"
    }
  ];

  const trustMetrics = [
    { label: "Active Portfolios", value: "12,847", icon: "Users" },
    { label: "Avg. Client Increase", value: "47%", icon: "TrendingUp" },
    { label: "Loading Speed", value: "&lt;3s", icon: "Zap" }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioSamples.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, portfolioSamples.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const handleStartTrial = () => {
    console.log('Start Free Trial clicked');
    // Trigger trial signup flow
  };

  const handleViewDemo = () => {
    console.log('View Live Demo clicked');
    // Trigger interactive portfolio builder preview
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background-secondary to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] bg-repeat"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                <Icon name="Sparkles" size={16} />
                <span>Trusted by 12,000+ Creative Professionals</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                The Only Portfolio Platform That{' '}
                <span className="text-gradient font-accent">Updates As Fast</span>{' '}
                As Your Creativity
              </h1>

              <p className="text-xl text-text-secondary leading-relaxed">
                Create stunning slide-based presentations, update content instantly through our CMS, 
                and win more clients without technical headaches.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartTrial}
                className="shadow-elevation hover:shadow-lg hover:-translate-y-0.5 transition-all-fast"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={20}
              >
                Start Free Trial
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleViewDemo}
                className="border-primary/30 text-primary hover:bg-primary/10"
                iconName="Play"
                iconPosition="left"
                iconSize={20}
              >
                View Live Demo
              </Button>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-subtle"
            >
              {trustMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name={metric.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{metric.value}</div>
                  <div className="text-sm text-text-secondary">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Portfolio Preview */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Portfolio Display */}
              <div className="relative bg-surface rounded-2xl shadow-elevation overflow-hidden border border-subtle">
                <div className="aspect-[4/3] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={portfolioSamples[currentSlide].image}
                        alt={portfolioSamples[currentSlide].title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-white/80 bg-white/20 px-2 py-1 rounded">
                                {portfolioSamples[currentSlide].category}
                              </span>
                              <span className="text-xs text-white/60">
                                {portfolioSamples[currentSlide].client}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {portfolioSamples[currentSlide].title}
                            </h3>
                            <p className="text-sm text-white/80">
                              {portfolioSamples[currentSlide].description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Portfolio Navigation */}
                <div className="p-4 bg-surface-hover">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {portfolioSamples.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleSlideChange(index)}
                          className={`w-2 h-2 rounded-full transition-all-fast ${
                            index === currentSlide 
                              ? 'bg-primary w-6' : 'bg-text-muted hover:bg-text-secondary'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-lg bg-surface hover:bg-background transition-all-fast"
                      >
                        <Icon 
                          name={isPlaying ? "Pause" : "Play"} 
                          size={16} 
                          color="var(--color-text-secondary)" 
                        />
                      </button>
                      
                      <div className="text-xs text-text-secondary">
                        {currentSlide + 1} / {portfolioSamples.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Update Indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -top-4 -right-4 bg-success text-success-foreground px-3 py-2 rounded-full text-sm font-medium shadow-elevation"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-foreground rounded-full animate-pulse"></div>
                  <span>Live Updates</span>
                </div>
              </motion.div>

              {/* Speed Indicator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-3 py-2 rounded-full text-sm font-medium shadow-elevation"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={14} />
                  <span>&lt;3s Load</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-text-secondary">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-full border border-subtle"
          >
            <Icon name="ChevronDown" size={20} color="var(--color-text-secondary)" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;