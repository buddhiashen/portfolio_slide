import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProblemSection = () => {
  const painPoints = [
    {
      id: 1,
      title: "Technical Update Barriers",
      description: "Spending hours trying to update portfolio content through complex CMS or coding",
      icon: "Code",
      severity: "high"
    },
    {
      id: 2,
      title: "Mobile Responsiveness Issues",
      description: "Losing clients because portfolio looks broken on mobile devices",
      icon: "Smartphone",
      severity: "critical"
    },
    {
      id: 3,
      title: "Client Impression Failures",
      description: "Outdated designs making you look unprofessional to potential clients",
      icon: "TrendingDown",
      severity: "high"
    },
    {
      id: 4,
      title: "Slow Loading Times",
      description: "High bounce rates due to portfolios taking forever to load",
      icon: "Clock",
      severity: "medium"
    }
  ];

  const beforeAfterComparison = {
    before: {
      title: "Outdated Static Portfolio",
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=600&h=400&fit=crop",
      issues: [
        "Hard to update content",
        "Not mobile responsive",
        "Slow loading times",
        "Limited customization",
        "Poor SEO performance"
      ]
    },
    after: {
      title: "Modern Dynamic Presentation",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      benefits: [
        "Instant content updates",
        "Perfect mobile experience",
        "Lightning fast loading",
        "Unlimited customization",
        "SEO optimized"
      ]
    }
  };

  return (
    <section className="py-20 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-error/10 text-error px-4 py-2 rounded-full text-sm font-medium border border-error/20 mb-6">
            <Icon name="AlertTriangle" size={16} />
            <span>The Portfolio Problem</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Your Portfolio Is{' '}
            <span className="text-error font-accent">Costing You Clients</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Every day you delay updating your portfolio is another day potential clients 
            choose your competition. Here's what's holding you back.
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card-surface rounded-2xl overflow-hidden border-2 border-error/20">
              <div className="relative">
                <Image
                  src={beforeAfterComparison.before.image}
                  alt="Outdated portfolio example"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-error text-error-foreground px-3 py-1 rounded-full text-sm font-medium">
                    BEFORE
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {beforeAfterComparison.before.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {beforeAfterComparison.before.issues.map((issue, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon name="X" size={16} color="var(--color-error)" />
                      <span className="text-text-secondary">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card-surface rounded-2xl overflow-hidden border-2 border-success/20">
              <div className="relative">
                <Image
                  src={beforeAfterComparison.after.image}
                  alt="Modern portfolio example"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                    AFTER
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {beforeAfterComparison.after.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {beforeAfterComparison.after.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} color="var(--color-success)" />
                      <span className="text-text-primary">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Success Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-medium shadow-elevation"
            >
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={14} />
                <span>47% More Clients</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Pain Points Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card-surface rounded-xl p-6 h-full hover:shadow-elevation transition-all-fast group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    point.severity === 'critical' ?'bg-error/10 text-error' 
                      : point.severity === 'high' ?'bg-warning/10 text-warning' :'bg-accent/10 text-accent'
                  }`}>
                    <Icon name={point.icon} size={24} />
                  </div>
                  
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    point.severity === 'critical' ?'bg-error/20 text-error'
                      : point.severity === 'high' ?'bg-warning/20 text-warning' :'bg-accent/20 text-accent'
                  }`}>
                    {point.severity.toUpperCase()}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {point.title}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Stop Losing Clients to Outdated Portfolios
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Join 12,000+ creative professionals who've transformed their client acquisition 
              with modern, dynamic portfolios that update instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-surface rounded-lg p-4 border border-subtle">
                <div className="text-2xl font-bold text-success">47%</div>
                <div className="text-sm text-text-secondary">Average client increase</div>
              </div>
              <div className="bg-surface rounded-lg p-4 border border-subtle">
                <div className="text-2xl font-bold text-primary">&lt;3s</div>
                <div className="text-sm text-text-secondary">Loading time guarantee</div>
              </div>
              <div className="bg-surface rounded-lg p-4 border border-subtle">
                <div className="text-2xl font-bold text-accent">99.9%</div>
                <div className="text-sm text-text-secondary">Uptime reliability</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;