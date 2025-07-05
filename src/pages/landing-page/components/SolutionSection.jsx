import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SolutionSection = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const demoPortfolios = [
    {
      id: 1,
      title: "Photography Portfolio",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop",
      description: "Stunning visual storytelling with instant gallery updates",
      features: ["Drag & Drop Upload", "Auto Image Optimization", "Mobile Gallery"],
      updateTime: "2 minutes"
    },
    {
      id: 2,
      title: "Design Agency Showcase",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      description: "Professional brand presentation with case study templates",
      features: ["Project Templates", "Client Testimonials", "Brand Guidelines"],
      updateTime: "5 minutes"
    },
    {
      id: 3,
      title: "Developer Portfolio",
      category: "Development",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      description: "Code-focused showcase with live project demonstrations",
      features: ["GitHub Integration", "Live Demos", "Tech Stack Display"],
      updateTime: "3 minutes"
    }
  ];

  const solutionFeatures = [
    {
      icon: "Zap",
      title: "Instant Updates",
      description: "Change content in seconds, not hours. Our CMS updates your portfolio in real-time.",
      benefit: "Save 10+ hours per week"
    },
    {
      icon: "Smartphone",
      title: "Mobile-First Design",
      description: "Every portfolio looks perfect on all devices automatically. No coding required.",
      benefit: "Reach 70% more clients"
    },
    {
      icon: "Palette",
      title: "Professional Templates",
      description: "Choose from designer-crafted templates that make you look like a pro instantly.",
      benefit: "Impress clients immediately"
    },
    {
      icon: "BarChart3",
      title: "Performance Analytics",
      description: "Track visitor engagement and optimize your portfolio for maximum impact.",
      benefit: "Increase conversion by 35%"
    }
  ];

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoPortfolios.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, demoPortfolios.length]);

  const handleDemoChange = (index) => {
    setActiveDemo(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleTryDemo = () => {
    console.log('Try Interactive Demo clicked');
    // Trigger interactive portfolio builder
  };

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
            <Icon name="CheckCircle" size={16} />
            <span>The Solution</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Portfolio Management{' '}
            <span className="text-gradient font-accent">Made Simple</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Update your portfolio in minutes, not hours. Our Supabase-powered platform 
            makes content management effortless while keeping your presentation professional.
          </p>
        </motion.div>

        {/* Interactive Portfolio Demo */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Demo Controls */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="card-surface rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-text-primary">
                  Live Portfolio Demo
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-success">Live Updates</span>
                </div>
              </div>

              <div className="space-y-4">
                {demoPortfolios.map((demo, index) => (
                  <button
                    key={demo.id}
                    onClick={() => handleDemoChange(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all-fast ${
                      index === activeDemo
                        ? 'bg-primary/10 border-2 border-primary/30' :'bg-surface hover:bg-surface-hover border border-subtle'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-primary mb-1">
                          {demo.title}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {demo.category} • Updates in {demo.updateTime}
                        </div>
                      </div>
                      <div className={`p-2 rounded-lg ${
                        index === activeDemo ? 'bg-primary text-primary-foreground' : 'bg-surface'
                      }`}>
                        <Icon name="Play" size={16} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-subtle">
                <Button
                  variant="primary"
                  onClick={handleTryDemo}
                  fullWidth
                  iconName="MousePointer"
                  iconPosition="left"
                  iconSize={18}
                >
                  Try Interactive Demo
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Demo Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card-surface rounded-2xl overflow-hidden shadow-elevation">
              <div className="aspect-[4/3] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDemo}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={demoPortfolios[activeDemo].image}
                      alt={demoPortfolios[activeDemo].title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-white/80 bg-white/20 px-2 py-1 rounded">
                              {demoPortfolios[activeDemo].category}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Icon name="Clock" size={12} color="white" />
                              <span className="text-xs text-white/80">
                                {demoPortfolios[activeDemo].updateTime}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {demoPortfolios[activeDemo].title}
                          </h3>
                          <p className="text-sm text-white/80 mb-3">
                            {demoPortfolios[activeDemo].description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {demoPortfolios[activeDemo].features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-white/20 text-white px-2 py-1 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Demo Navigation */}
              <div className="p-4 bg-surface-hover">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {demoPortfolios.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDemoChange(index)}
                        className={`w-2 h-2 rounded-full transition-all-fast ${
                          index === activeDemo 
                            ? 'bg-primary w-6' :'bg-text-muted hover:bg-text-secondary'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="p-2 rounded-lg bg-surface hover:bg-background transition-all-fast"
                  >
                    <Icon 
                      name={isAutoPlaying ? "Pause" : "Play"} 
                      size={16} 
                      color="var(--color-text-secondary)" 
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Update Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -top-4 -right-4 bg-success text-success-foreground px-3 py-2 rounded-full text-sm font-medium shadow-elevation"
            >
              <div className="flex items-center space-x-2">
                <Icon name="RefreshCw" size={14} />
                <span>Real-time</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Solution Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {solutionFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card-surface rounded-xl p-6 h-full hover:shadow-elevation transition-all-fast group-hover:-translate-y-1">
                <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all-fast">
                  <Icon name={feature.icon} size={24} />
                </div>
                
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <div className="bg-success/10 text-success px-3 py-2 rounded-lg text-sm font-medium">
                  {feature.benefit}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;