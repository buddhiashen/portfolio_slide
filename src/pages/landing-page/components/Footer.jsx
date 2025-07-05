import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Templates", href: "#templates" },
        { name: "Pricing", href: "#pricing" },
        { name: "Integrations", href: "#integrations" },
        { name: "API", href: "#api" },
        { name: "Changelog", href: "#changelog" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Documentation", href: "#docs" },
        { name: "Video Tutorials", href: "#tutorials" },
        { name: "Portfolio Examples", href: "#examples" },
        { name: "Design Guidelines", href: "#guidelines" },
        { name: "Community", href: "#community" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Press Kit", href: "#press" },
        { name: "Partner Program", href: "#partners" },
        { name: "Affiliate Program", href: "#affiliates" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "GDPR", href: "#gdpr" },
        { name: "Security", href: "#security" },
        { name: "Compliance", href: "#compliance" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", href: "#twitter" },
    { name: "Instagram", icon: "Instagram", href: "#instagram" },
    { name: "LinkedIn", icon: "Linkedin", href: "#linkedin" },
    { name: "YouTube", icon: "Youtube", href: "#youtube" },
    { name: "Dribbble", icon: "Dribbble", href: "#dribbble" },
    { name: "Behance", icon: "Figma", href: "#behance" }
  ];

  const trustBadges = [
    { name: "SOC 2 Compliant", icon: "Shield" },
    { name: "GDPR Ready", icon: "Lock" },
    { name: "99.9% Uptime", icon: "Zap" },
    { name: "SSL Secured", icon: "CheckCircle" }
  ];

  const handleLinkClick = (href) => {
    console.log('Footer link clicked:', href);
    // Handle navigation
  };

  const handleSocialClick = (platform) => {
    console.log('Social link clicked:', platform);
    // Open social media link
  };

  return (
    <footer className="bg-background-secondary border-t border-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Layers" size={24} color="white" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-primary font-inter tracking-tight">
                      Portfolio
                    </span>
                    <span className="text-sm font-medium text-secondary -mt-1">
                      Slide
                    </span>
                  </div>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  The only portfolio platform that updates as fast as your creativity. 
                  Trusted by 12,000+ creative professionals worldwide.
                </p>

                {/* Social Links */}
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <button
                      key={social.name}
                      onClick={() => handleSocialClick(social.name)}
                      className="p-2 rounded-lg bg-surface hover:bg-surface-hover border border-subtle hover:border-primary/30 transition-all-fast group"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <Icon 
                        name={social.icon} 
                        size={18} 
                        color="var(--color-text-secondary)" 
                        className="group-hover:text-primary transition-all-fast"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-4">
              <div className="grid md:grid-cols-4 gap-8">
                {footerSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-text-primary font-semibold mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={link.name}>
                          <button
                            onClick={() => handleLinkClick(link.href)}
                            className="text-text-secondary hover:text-text-primary transition-all-fast text-sm"
                          >
                            {link.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-subtle"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} color="var(--color-primary)" />
              <span className="text-text-primary font-medium">Trusted & Secure</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name={badge.icon} size={16} color="var(--color-success)" />
                  <span className="text-text-secondary text-sm">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-subtle"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Stay Updated
                </h3>
                <p className="text-text-secondary text-sm">
                  Get portfolio tips, design inspiration, and product updates delivered to your inbox.
                </p>
              </div>
              
              <div className="flex space-x-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2 bg-surface border border-subtle rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all-fast"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-700 transition-all-fast whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-subtle"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-text-secondary text-sm">
              © {currentYear} Portfolio Slide. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-text-secondary text-sm">
                <Icon name="MapPin" size={14} />
                <span>Made with ❤️ in San Francisco</span>
              </div>
              
              <div className="flex items-center space-x-2 text-text-secondary text-sm">
                <Icon name="Globe" size={14} />
                <span>Available worldwide</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;