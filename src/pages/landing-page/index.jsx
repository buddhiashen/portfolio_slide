import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup on unmount
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Portfolio Slide - The Only Portfolio Platform That Updates As Fast As Your Creativity</title>
        <meta 
          name="description" 
          content="Create stunning slide-based portfolio presentations, update content instantly through our CMS, and win more clients without technical headaches. Trusted by 12,000+ creative professionals." 
        />
        <meta 
          name="keywords" 
          content="portfolio platform, creative portfolio, portfolio CMS, portfolio builder, creative professionals, portfolio management, portfolio website, portfolio templates" 
        />
        <meta name="author" content="Portfolio Slide" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolioslide.com/landing-page" />
        <meta property="og:title" content="Portfolio Slide - Transform Your Creative Portfolio" />
        <meta property="og:description" content="The only portfolio platform that updates as fast as your creativity. Join 12,000+ creative professionals." />
        <meta property="og:image" content="https://portfolioslide.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://portfolioslide.com/landing-page" />
        <meta property="twitter:title" content="Portfolio Slide - Transform Your Creative Portfolio" />
        <meta property="twitter:description" content="The only portfolio platform that updates as fast as your creativity. Join 12,000+ creative professionals." />
        <meta property="twitter:image" content="https://portfolioslide.com/twitter-image.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Portfolio Slide",
            "description": "Portfolio platform for creative professionals with instant content management",
            "url": "https://portfolioslide.com",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "19",
              "priceCurrency": "USD",
              "priceValidUntil": "2024-12-31"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "12847"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-text-primary">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section id="hero">
            <HeroSection />
          </section>

          {/* Problem Section */}
          <section id="problem">
            <ProblemSection />
          </section>

          {/* Solution Section */}
          <section id="demo">
            <SolutionSection />
          </section>

          {/* Benefits Section */}
          <section id="benefits">
            <BenefitsSection />
          </section>

          {/* Testimonials Section */}
          <section id="testimonials">
            <TestimonialsSection />
          </section>

          {/* Pricing Section */}
          <section id="pricing">
            <PricingSection />
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <FAQSection />
          </section>

          {/* Contact Section */}
          <section id="contact">
            <ContactSection />
          </section>

          {/* Final CTA Section */}
          <section id="cta">
            <CTASection />
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;