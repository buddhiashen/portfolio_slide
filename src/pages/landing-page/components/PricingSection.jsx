import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [portfolioSize, setPortfolioSize] = useState(50);
  const [clientVolume, setClientVolume] = useState(100);

  const plans = [
    {
      id: 'starter',
      name: 'Creative Starter',
      description: 'Perfect for freelancers and individual creatives',
      monthlyPrice: 19,
      yearlyPrice: 15,
      popular: false,
      features: [
        'Up to 25 portfolio pieces',
        '5GB storage space',
        'Mobile-responsive templates',
        'Basic analytics',
        'Email support',
        'Custom domain',
        'SEO optimization',
        'Social media integration'
      ],
      limits: {
        portfolioPieces: 25,
        storage: '5GB',
        templates: 'Basic collection',
        support: 'Email only'
      },
      ideal: 'Individual freelancers'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for established creatives and small agencies',
      monthlyPrice: 49,
      yearlyPrice: 39,
      popular: true,
      features: [
        'Up to 100 portfolio pieces',
        '25GB storage space',
        'Premium template collection',
        'Advanced analytics & insights',
        'Priority email + chat support',
        'Custom branding options',
        'Client collaboration tools',
        'Advanced SEO features',
        'Integration with creative tools',
        'Portfolio password protection'
      ],
      limits: {
        portfolioPieces: 100,
        storage: '25GB',
        templates: 'Premium collection',
        support: 'Email + Chat'
      },
      ideal: 'Professional creatives & small agencies'
    },
    {
      id: 'agency',
      name: 'Agency Pro',
      description: 'Built for creative agencies and large teams',
      monthlyPrice: 99,
      yearlyPrice: 79,
      popular: false,
      features: [
        'Unlimited portfolio pieces',
        '100GB storage space',
        'All premium templates',
        'Advanced analytics dashboard',
        '24/7 phone + chat support',
        'White-label options',
        'Team collaboration features',
        'Client portal access',
        'API access for integrations',
        'Custom template creation',
        'Multi-user management',
        'Advanced security features'
      ],
      limits: {
        portfolioPieces: 'Unlimited',
        storage: '100GB',
        templates: 'All templates + custom',
        support: '24/7 Phone + Chat'
      },
      ideal: 'Creative agencies & large teams'
    }
  ];

  const templatePreviews = [
    {
      id: 1,
      name: 'Minimal Portfolio',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=300&h=200&fit=crop',
      tier: 'starter'
    },
    {
      id: 2,
      name: 'Creative Agency',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      tier: 'professional'
    },
    {
      id: 3,
      name: 'Premium Showcase',
      category: 'Multi-purpose',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      tier: 'agency'
    }
  ];

  const calculatePrice = (plan) => {
    const basePrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const savings = billingCycle === 'yearly' ? ((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice * 100).toFixed(0) : 0;
    return { price: basePrice, savings };
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    console.log('Plan selected:', planId);
  };

  const handleStartTrial = (planId) => {
    console.log('Start trial for plan:', planId);
    // Trigger trial signup flow
  };

  const handlePreviewTemplate = (templateId) => {
    console.log('Preview template:', templateId);
    // Trigger template gallery modal
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
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium border border-accent/20 mb-6">
            <Icon name="CreditCard" size={16} />
            <span>Simple Pricing</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Choose Your{' '}
            <span className="text-gradient font-accent">Creative Journey</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Start free, scale as you grow. Every plan includes our core features 
            with no hidden fees or surprise charges.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-surface rounded-lg p-1 border border-subtle">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all-fast ${
                billingCycle === 'monthly' ?'bg-primary text-primary-foreground shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all-fast relative ${
                billingCycle === 'yearly' ?'bg-primary text-primary-foreground shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const { price, savings } = calculatePrice(plan);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative card-surface rounded-2xl p-8 transition-all-fast hover:shadow-elevation hover:-translate-y-1 ${
                  plan.popular ? 'border-2 border-primary/30 shadow-elevation' : ''
                } ${
                  selectedPlan === plan.id ? 'ring-2 ring-primary/50' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-elevation">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-text-primary">
                        ${price}
                      </span>
                      <span className="text-text-secondary ml-2">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    
                    {billingCycle === 'yearly' && savings > 0 && (
                      <div className="text-sm text-success mt-2">
                        Save {savings}% with yearly billing
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-text-secondary">
                    Ideal for: {plan.ideal}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Plan Limits */}
                <div className="bg-surface rounded-lg p-4 mb-6 border border-subtle">
                  <div className="text-sm font-medium text-text-primary mb-3">Plan Limits</div>
                  <div className="space-y-2">
                    {Object.entries(plan.limits).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-text-secondary capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-text-primary font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  onClick={() => handleStartTrial(plan.id)}
                  fullWidth
                  className={plan.popular ? "shadow-elevation" : ""}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={18}
                >
                  Start Free Trial
                </Button>

                {/* Template Preview */}
                <div className="mt-6 pt-6 border-t border-subtle">
                  <div className="text-sm font-medium text-text-primary mb-3">
                    Template Preview
                  </div>
                  {templatePreviews
                    .filter(template => template.tier === plan.id)
                    .map(template => (
                      <button
                        key={template.id}
                        onClick={() => handlePreviewTemplate(template.id)}
                        className="w-full text-left p-3 rounded-lg bg-surface hover:bg-surface-hover transition-all-fast border border-subtle"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 rounded overflow-hidden">
                            <img
                              src={template.image}
                              alt={template.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-text-primary">
                              {template.name}
                            </div>
                            <div className="text-xs text-text-secondary">
                              {template.category}
                            </div>
                          </div>
                          <Icon name="ExternalLink" size={14} color="var(--color-text-secondary)" />
                        </div>
                      </button>
                    ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Pricing Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Find Your Perfect Plan
            </h3>
            <p className="text-text-secondary">
              Adjust the sliders to see which plan fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Portfolio Size Slider */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Portfolio Pieces: {portfolioSize}
              </label>
              <input
                type="range"
                min="10"
                max="200"
                value={portfolioSize}
                onChange={(e) => setPortfolioSize(parseInt(e.target.value))}
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-2">
                <span>10</span>
                <span>200+</span>
              </div>
            </div>

            {/* Client Volume Slider */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Monthly Visitors: {clientVolume}
              </label>
              <input
                type="range"
                min="50"
                max="1000"
                value={clientVolume}
                onChange={(e) => setClientVolume(parseInt(e.target.value))}
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-2">
                <span>50</span>
                <span>1000+</span>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-8 p-6 bg-surface rounded-lg border border-subtle">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
              <span className="font-medium text-text-primary">Recommended Plan</span>
            </div>
            
            <div className="text-lg font-semibold text-primary mb-2">
              {portfolioSize <= 25 && clientVolume <= 200 ? 'Creative Starter' :
               portfolioSize <= 100 && clientVolume <= 500 ? 'Professional': 'Agency Pro'}
            </div>
            
            <p className="text-text-secondary text-sm">
              Based on your requirements, this plan offers the best value and features for your portfolio needs.
            </p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "What happens to my data if I cancel?",
                answer: "Your portfolio remains accessible for 30 days after cancellation, giving you time to export your content."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans. No questions asked."
              },
              {
                question: "Is there a setup fee?",
                answer: "No setup fees, no hidden charges. The price you see is exactly what you pay."
              }
            ].map((faq, index) => (
              <div key={index} className="card-surface rounded-lg p-6">
                <h4 className="font-semibold text-text-primary mb-3">{faq.question}</h4>
                <p className="text-text-secondary text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;