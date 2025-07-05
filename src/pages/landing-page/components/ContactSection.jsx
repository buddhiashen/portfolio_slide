import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    portfolioSize: '',
    timeline: '',
    budget: '',
    message: '',
    industry: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const projectTypes = [
    'New Portfolio Creation',
    'Portfolio Redesign',
    'Content Migration',
    'Team/Agency Setup',
    'Custom Integration',
    'Consultation Only'
  ];

  const industries = [
    'Photography',
    'Graphic Design',
    'Web Design',
    'Architecture',
    'Fashion',
    'Fine Arts',
    'Creative Agency',
    'Marketing',
    'Other'
  ];

  const budgetRanges = [
    'Under $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000+',
    'Not sure yet'
  ];

  const timelines = [
    'ASAP (Within 1 week)',
    '2-4 weeks',
    '1-2 months',
    '3-6 months',
    'No rush',
    'Just exploring'
  ];

  const contactMethods = [
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      description: 'Get instant answers to your questions',
      action: 'Start Chat',
      available: 'Available 9 AM - 6 PM EST'
    },
    {
      icon: 'Mail',
      title: 'Email Support',
      description: 'Detailed project discussions and quotes',
      action: 'Send Email',
      available: 'Response within 2 hours'
    },
    {
      icon: 'Phone',
      title: 'Schedule Call',
      description: 'Personal consultation with our team',
      action: 'Book Call',
      available: 'Available Mon-Fri'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-suggest industry based on email domain or project type
    if (name === 'email' && value.includes('@')) {
      const domain = value.split('@')[1];
      if (domain && !formData.industry) {
        // Simple industry detection logic
        if (domain.includes('photo') || domain.includes('image')) {
          setFormData(prev => ({ ...prev, industry: 'Photography' }));
        } else if (domain.includes('design') || domain.includes('creative')) {
          setFormData(prev => ({ ...prev, industry: 'Graphic Design' }));
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      console.log('Form submitted:', formData);
      
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          portfolioSize: '',
          timeline: '',
          budget: '',
          message: '',
          industry: ''
        });
      }, 3000);
    }, 2000);
  };

  const handleContactMethod = (method) => {
    console.log('Contact method selected:', method);
    // Trigger appropriate contact method
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
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 mb-6">
            <Icon name="MessageSquare" size={16} />
            <span>Get In Touch</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Transform{' '}
            <span className="text-gradient font-accent">Your Portfolio?</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Let's discuss your project and find the perfect solution for your portfolio needs. 
            Our team is here to help you succeed.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-surface rounded-2xl p-8 shadow-elevation"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Tell Us About Your Project
              </h3>

              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} color="var(--color-success)" />
                  </div>
                  <h4 className="text-xl font-semibold text-text-primary mb-2">
                    Thank You!
                  </h4>
                  <p className="text-text-secondary mb-4">
                    We've received your project inquiry and will get back to you within 2 hours.
                  </p>
                  <div className="text-sm text-success">
                    Check your email for a confirmation and next steps.
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Company/Studio
                      </label>
                      <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Industry
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-surface border border-subtle rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all-fast"
                      >
                        <option value="">Select your industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-surface border border-subtle rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all-fast"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Portfolio Size
                      </label>
                      <Input
                        type="text"
                        name="portfolioSize"
                        value={formData.portfolioSize}
                        onChange={handleInputChange}
                        placeholder="e.g., 50 projects, 200 images"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-surface border border-subtle rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all-fast"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map(timeline => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-surface border border-subtle rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all-fast"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Project Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us more about your project, goals, and any specific requirements..."
                      className="w-full px-4 py-3 bg-surface border border-subtle rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all-fast resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    className="shadow-elevation"
                    iconName="Send"
                    iconPosition="right"
                    iconSize={18}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Project Inquiry'}
                  </Button>

                  <div className="text-center text-sm text-text-secondary">
                    We'll respond within 2 hours during business hours
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* Contact Methods & Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-surface rounded-2xl p-6 shadow-elevation"
            >
              <h3 className="text-xl font-bold text-text-primary mb-6">
                Other Ways to Reach Us
              </h3>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <button
                    key={index}
                    onClick={() => handleContactMethod(method.title)}
                    className="w-full text-left p-4 rounded-lg bg-surface hover:bg-surface-hover border border-subtle transition-all-fast group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all-fast">
                        <Icon name={method.icon} size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-text-primary mb-1">
                          {method.title}
                        </div>
                        <div className="text-sm text-text-secondary mb-2">
                          {method.description}
                        </div>
                        <div className="text-xs text-primary">
                          {method.available}
                        </div>
                      </div>
                      <Icon name="ArrowRight" size={16} color="var(--color-text-secondary)" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-surface rounded-2xl p-6 shadow-elevation"
            >
              <h3 className="text-xl font-bold text-text-primary mb-6">
                Why Choose Us?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={16} color="var(--color-success)" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Fast Response</div>
                    <div className="text-xs text-text-secondary">Average 2-hour response time</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Icon name="Users" size={16} color="var(--color-primary)" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">12,000+ Portfolios</div>
                    <div className="text-xs text-text-secondary">Trusted by creative professionals</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Icon name="Star" size={16} color="var(--color-accent)" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">4.9/5 Rating</div>
                    <div className="text-xs text-text-secondary">Customer satisfaction score</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={16} color="var(--color-secondary)" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">99.9% Uptime</div>
                    <div className="text-xs text-text-secondary">Reliable hosting guarantee</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-accent/10 to-warning/10 rounded-2xl p-6 border border-accent/20"
            >
              <div className="flex items-start space-x-3">
                <Icon name="Zap" size={20} color="var(--color-accent)" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">
                    Need Urgent Help?
                  </h4>
                  <p className="text-sm text-text-secondary mb-3">
                    For time-sensitive projects or technical emergencies, 
                    contact our priority support line.
                  </p>
                  <button className="text-sm font-medium text-accent hover:text-accent-600 transition-all-fast">
                    Call Priority Support →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;