import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BenefitsSection = () => {
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  const benefits = [
    {
      id: 1,
      icon: "Zap",
      title: "Instant Content Updates",
      description: "Update your portfolio in seconds with our intuitive CMS. No coding, no waiting, no hassle.",
      metrics: {
        timeSaved: "10+ hours/week",
        efficiency: "95% faster updates",
        satisfaction: "4.9/5 rating"
      },
      caseStudy: {
        client: "Sarah Chen, Photographer",
        quote: "I used to spend entire weekends updating my portfolio. Now it takes 2 minutes.",
        result: "300% increase in client inquiries"
      },
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      icon: "TrendingUp",
      title: "Client Acquisition Boost",
      description: "Professional presentations that convert visitors into paying clients consistently.",
      metrics: {
        avgIncrease: "47% more clients",
        conversionRate: "23% higher",
        revenue: "$15K avg increase"
      },
      caseStudy: {
        client: "Marcus Design Studio",
        quote: "Our client acquisition doubled within 3 months of switching.",
        result: "Generated $45K in new business"
      },
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      icon: "Shield",
      title: "Technical Simplicity",
      description: "Focus on your craft, not technical headaches. We handle all the complex stuff behind the scenes.",
      metrics: {
        uptime: "99.9% reliability",
        support: "24/7 assistance",
        setup: "5-minute launch"
      },
      caseStudy: {
        client: "Creative Collective Agency",
        quote: "Finally, a platform that just works. No more technical nightmares.",
        result: "Saved $8K in developer costs"
      },
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
    }
  ];

  const successMetrics = [
    { label: "Active Portfolios", value: "12,847", icon: "Users", color: "primary" },
    { label: "Avg Load Time", value: "2.1s", icon: "Zap", color: "accent" },
    { label: "Client Satisfaction", value: "4.9/5", icon: "Star", color: "success" },
    { label: "Uptime Guarantee", value: "99.9%", icon: "Shield", color: "secondary" }
  ];

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
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 mb-6">
            <Icon name="Award" size={16} />
            <span>Proven Benefits</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Why Creative Professionals{' '}
            <span className="text-gradient font-accent">Choose Us</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Join thousands of creative professionals who've transformed their client acquisition 
            with portfolios that work as hard as they do.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
              onMouseEnter={() => setHoveredBenefit(benefit.id)}
              onMouseLeave={() => setHoveredBenefit(null)}
            >
              <div className="card-surface rounded-2xl overflow-hidden h-full hover:shadow-elevation transition-all-fast group-hover:-translate-y-2">
                {/* Benefit Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all-fast"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <Icon name={benefit.icon} size={24} color="white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Metrics */}
                  <div className="space-y-3 mb-6">
                    {Object.entries(benefit.metrics).map(([key, value], idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Case Study Preview */}
                  <div className={`bg-surface rounded-lg p-4 border border-subtle transition-all-fast ${
                    hoveredBenefit === benefit.id ? 'opacity-100 translate-y-0' : 'opacity-70'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Quote" size={14} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary italic mb-2">
                          "{benefit.caseStudy.quote}"
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-text-primary">
                            {benefit.caseStudy.client}
                          </span>
                          <span className="text-xs text-success font-medium">
                            {benefit.caseStudy.result}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Trusted by Creative Professionals Worldwide
            </h3>
            <p className="text-text-secondary">
              Real numbers from real portfolios making real impact
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${
                  metric.color === 'primary' ? 'bg-primary/10 text-primary' :
                  metric.color === 'accent' ? 'bg-accent/10 text-accent' :
                  metric.color === 'success'? 'bg-success/10 text-success' : 'bg-secondary/10 text-secondary'
                }`}>
                  <Icon name={metric.icon} size={20} />
                </div>
                
                <div className="text-2xl lg:text-3xl font-bold text-text-primary mb-1">
                  {metric.value}
                </div>
                
                <div className="text-sm text-text-secondary">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Transform Your Portfolio?
            </h3>
            <p className="text-text-secondary mb-6">
              Join the creative professionals who've already discovered the power of effortless portfolio management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} color="var(--color-success)" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} color="var(--color-success)" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} color="var(--color-success)" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;