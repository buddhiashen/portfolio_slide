import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const benefits = [
    "No credit card required",
    "14-day free trial",
    "Cancel anytime",
    "Full feature access",
    "Priority support",
    "Migration assistance"
  ];

  const socialProof = [
    { count: "12,847", label: "Active Portfolios" },
    { count: "47%", label: "Avg. Client Increase" },
    { count: "4.9/5", label: "Customer Rating" },
    { count: "99.9%", label: "Uptime Guarantee" }
  ];

  const testimonialQuotes = [
    {
      quote: "Best decision I made for my photography business",
      author: "Sarah Chen",
      role: "Photographer"
    },
    {
      quote: "Doubled our client acquisition in 3 months",
      author: "Marcus Rodriguez",
      role: "Creative Director"
    },
    {
      quote: "Finally, a portfolio platform that just works",
      author: "Emily Watson",
      role: "UX Designer"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Countdown timer simulation
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Rotate testimonial quotes
    const quoteTimer = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % testimonialQuotes.length);
    }, 4000);

    return () => clearInterval(quoteTimer);
  }, [testimonialQuotes.length]);

  const handleStartTrial = () => {
    console.log('Start Free Trial clicked - Final CTA');
    // Trigger trial signup flow with analytics tracking
  };

  const handleViewDemo = () => {
    console.log('View Demo clicked - Final CTA');
    // Trigger demo modal
  };

  const handleScheduleCall = () => {
    console.log('Schedule Call clicked');
    // Trigger calendar booking
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium border border-success/20 mb-6">
            <Icon name="Sparkles" size={16} />
            <span>Limited Time Offer</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Transform Your Portfolio{' '}
            <span className="text-gradient font-accent">Today</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Join thousands of creative professionals who've already discovered the power 
            of effortless portfolio management. Start your free trial now.
          </p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-surface rounded-2xl p-6 border border-subtle shadow-elevation mb-8 max-w-md mx-auto"
          >
            <div className="text-sm font-medium text-text-primary mb-3">
              Extended Trial Ends In:
            </div>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-text-secondary capitalize">{unit}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Primary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button
              variant="primary"
              size="xl"
              onClick={handleStartTrial}
              className="shadow-elevation hover:shadow-lg hover:-translate-y-0.5 transition-all-fast"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={20}
            >
              Start Free Trial Now
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              onClick={handleViewDemo}
              className="border-primary/30 text-primary hover:bg-primary/10"
              iconName="Play"
              iconPosition="left"
              iconSize={20}
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={16} color="var(--color-success)" />
                <span className="text-sm text-text-secondary">{benefit}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          {/* Stats */}
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              Trusted by Creative Professionals
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {socialProof.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-surface rounded-lg border border-subtle"
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.count}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Rotating Testimonials */}
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              What Our Users Say
            </h3>
            <div className="bg-surface rounded-2xl p-6 border border-subtle shadow-elevation">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} color="var(--color-accent)" />
                  ))}
                </div>
                <blockquote className="text-lg text-text-primary mb-4">
                  "{testimonialQuotes[currentQuote].quote}"
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">
                      {testimonialQuotes[currentQuote].author}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {testimonialQuotes[currentQuote].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Alternative CTA Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-surface rounded-2xl p-8 border border-subtle shadow-elevation">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Not Ready to Start Yet?
            </h3>
            <p className="text-text-secondary mb-6">
              Schedule a personal consultation to see how Portfolio Slide can transform your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                onClick={handleScheduleCall}
                iconName="Calendar"
                iconPosition="left"
                iconSize={18}
              >
                Schedule Free Consultation
              </Button>
              
              <button className="inline-flex items-center space-x-2 text-primary hover:text-primary-700 transition-all-fast">
                <Icon name="Download" size={18} />
                <span>Download Portfolio Guide</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Final Urgency Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-warning/10 to-accent/10 rounded-2xl p-6 border border-warning/20">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Icon name="Clock" size={20} color="var(--color-warning)" />
                <span className="font-medium text-warning">Limited Time</span>
              </div>
              <p className="text-text-secondary text-sm">
                Extended 21-day trial (normally 14 days) expires soon. 
                Start building your professional portfolio today and see results within the first week.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;