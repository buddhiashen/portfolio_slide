import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      id: 1,
      category: "Getting Started",
      question: "Do I need technical skills to use Portfolio Slide?",
      answer: `Not at all! Portfolio Slide is designed for creative professionals, not developers. Our drag-and-drop interface makes it incredibly easy to create and update your portfolio.\n\nYou can upload your work, customize layouts, and publish your portfolio in minutes. No coding knowledge required.`,
      videoDemo: "https://example.com/demo-video-1",
      relatedDocs: ["Quick Start Guide", "Template Customization"]
    },
    {
      id: 2,
      category: "Content Management",
      question: "How quickly can I update my portfolio content?",
      answer: `Updates are instant! Once you make changes in our CMS, they appear on your live portfolio immediately.\n\nMost users can add new projects in under 2 minutes. Bulk uploads and batch editing make it even faster for larger updates.`,
      videoDemo: "https://example.com/demo-video-2",
      relatedDocs: ["Content Management Guide", "Bulk Upload Tutorial"]
    },
    {
      id: 3,
      category: "Technical",
      question: "Will my portfolio work on all devices?",
      answer: `Yes! Every portfolio is automatically optimized for desktop, tablet, and mobile devices. We use responsive design principles to ensure your work looks perfect everywhere.\n\nOur templates are tested across all major browsers and devices to guarantee consistent performance.`,
      videoDemo: "https://example.com/demo-video-3",
      relatedDocs: ["Mobile Optimization", "Browser Compatibility"]
    },
    {
      id: 4,
      category: "Migration",
      question: "Can I migrate my existing portfolio content?",
      answer: `Absolutely! We provide migration tools and support to help you transfer content from your existing portfolio.\n\nOur team can assist with bulk imports from popular platforms like Behance, Dribbble, or your current website. Most migrations complete within 24 hours.`,
      videoDemo: "https://example.com/demo-video-4",
      relatedDocs: ["Migration Guide", "Import Tools", "Data Transfer"]
    },
    {
      id: 5,
      category: "Sharing & Collaboration",
      question: "How do I share my portfolio with clients?",
      answer: `Sharing is simple and flexible. You can:\n• Share a direct link to your portfolio\n• Create password-protected portfolios for specific clients\n• Generate embed codes for your website\n• Export PDF presentations for offline sharing\n\nYou'll also get analytics to see who's viewing your work and for how long.`,
      videoDemo: "https://example.com/demo-video-5",
      relatedDocs: ["Sharing Options", "Client Collaboration", "Analytics Guide"]
    },
    {
      id: 6,
      category: "Pricing & Plans",
      question: "What happens if I exceed my plan limits?",
      answer: `We'll notify you before you reach your limits. You can either upgrade your plan or we'll help you optimize your current usage.\n\nWe never delete your content or shut down your portfolio without warning. You'll always have time to make adjustments.`,
      videoDemo: "https://example.com/demo-video-6",
      relatedDocs: ["Plan Limits", "Upgrade Process", "Usage Optimization"]
    },
    {
      id: 7,
      category: "Customization",
      question: "Can I customize the design to match my brand?",
      answer: `Yes! All plans include customization options:\n• Upload your logo and brand colors\n• Choose from professional templates\n• Customize fonts and layouts\n• Add custom CSS (Pro plans)\n\nYour portfolio will reflect your unique brand identity while maintaining professional presentation standards.`,
      videoDemo: "https://example.com/demo-video-7",
      relatedDocs: ["Brand Customization", "Template Guide", "Custom CSS"]
    },
    {
      id: 8,
      category: "Support",
      question: "What kind of support do you provide?",
      answer: `We offer comprehensive support based on your plan:\n• Email support for all users\n• Live chat for Professional and Agency plans\n• Phone support for Agency plans\n• Extensive documentation and video tutorials\n• Community forum for tips and inspiration\n\nOur average response time is under 2 hours during business hours.`,
      videoDemo: "https://example.com/demo-video-8",
      relatedDocs: ["Support Options", "Contact Information", "Help Center"]
    }
  ];

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const handleFAQToggle = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  const handleVideoDemo = (videoUrl) => {
    console.log('Play video demo:', videoUrl);
    // Trigger video modal or player
  };

  const handleDocLink = (docName) => {
    console.log('Open documentation:', docName);
    // Navigate to documentation
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium border border-secondary/20 mb-6">
            <Icon name="HelpCircle" size={16} />
            <span>Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Got Questions?{' '}
            <span className="text-gradient font-accent">We've Got Answers</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Everything you need to know about Portfolio Slide, from getting started 
            to advanced features. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              className="px-4 py-2 rounded-lg bg-surface hover:bg-surface-hover border border-subtle text-text-secondary hover:text-text-primary transition-all-fast text-sm"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="card-surface rounded-xl overflow-hidden border border-subtle"
            >
              {/* Question Header */}
              <button
                onClick={() => handleFAQToggle(index)}
                className="w-full p-6 text-left hover:bg-surface-hover transition-all-fast"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div className={`p-2 rounded-lg bg-surface transition-all-fast ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}>
                    <Icon name="ChevronDown" size={20} color="var(--color-text-secondary)" />
                  </div>
                </div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-subtle">
                      <div className="pt-6">
                        {/* Answer Text */}
                        <div className="text-text-secondary leading-relaxed mb-6">
                          {faq.answer.split('\n').map((paragraph, idx) => (
                            <p key={idx} className={idx > 0 ? 'mt-4' : ''}>
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {/* Video Demo Button */}
                        {faq.videoDemo && (
                          <div className="mb-6">
                            <button
                              onClick={() => handleVideoDemo(faq.videoDemo)}
                              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all-fast"
                            >
                              <Icon name="Play" size={16} />
                              <span className="text-sm font-medium">Watch Video Demo</span>
                            </button>
                          </div>
                        )}

                        {/* Related Documentation */}
                        {faq.relatedDocs && faq.relatedDocs.length > 0 && (
                          <div>
                            <div className="text-sm font-medium text-text-primary mb-3">
                              Related Documentation:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {faq.relatedDocs.map((doc, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleDocLink(doc)}
                                  className="inline-flex items-center space-x-1 px-3 py-1 bg-surface hover:bg-surface-hover border border-subtle rounded-lg text-sm text-text-secondary hover:text-text-primary transition-all-fast"
                                >
                                  <Icon name="FileText" size={12} />
                                  <span>{doc}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Still Have Questions?
              </h3>
              <p className="text-text-secondary mb-6">
                Our support team is here to help you succeed. Get personalized assistance 
                with your portfolio setup and optimization.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-700 transition-all-fast shadow-elevation">
                  <Icon name="MessageCircle" size={18} />
                  <span>Start Live Chat</span>
                </button>
                
                <button className="inline-flex items-center space-x-2 px-6 py-3 bg-surface text-text-primary border border-subtle rounded-lg hover:bg-surface-hover transition-all-fast">
                  <Icon name="Mail" size={18} />
                  <span>Email Support</span>
                </button>
                
                <button className="inline-flex items-center space-x-2 px-6 py-3 bg-surface text-text-primary border border-subtle rounded-lg hover:bg-surface-hover transition-all-fast">
                  <Icon name="Book" size={18} />
                  <span>Help Center</span>
                </button>
              </div>

              {/* Support Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-subtle">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">&lt;2h</div>
                  <div className="text-sm text-text-secondary">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">4.9/5</div>
                  <div className="text-sm text-text-secondary">Support Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-text-secondary">Help Center</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;