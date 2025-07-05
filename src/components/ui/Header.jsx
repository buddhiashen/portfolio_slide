import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';
import Login from '../auth/Login';
import Signup from '../auth/Signup';

const Header = () => {
  const { user, userProfile, signOut, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    setAuthMode('login');
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const switchToSignup = () => {
    setAuthMode('signup');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Layout" size={18} color="white" />
              </div>
              <span className="text-xl font-bold text-text-primary">
                Portfolio Slide
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="#hero" 
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Home
              </a>
              <a 
                href="#demo" 
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Demo
              </a>
              <a 
                href="#pricing" 
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <a 
                href="#testimonials" 
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Testimonials
              </a>
              <a 
                href="#contact" 
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {userProfile?.avatar_url ? (
                        <img 
                          src={userProfile.avatar_url} 
                          alt={userProfile?.full_name || 'User'} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <Icon name="User" size={16} color="var(--color-primary)" />
                      )}
                    </div>
                    <span className="hidden md:block text-text-primary font-medium">
                      {userProfile?.full_name || user.email}
                    </span>
                    <Icon name="ChevronDown" size={16} />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-surface rounded-lg shadow-elevation border border-subtle overflow-hidden"
                      >
                        <div className="p-4 border-b border-subtle">
                          <div className="font-medium text-text-primary">
                            {userProfile?.full_name || 'User'}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {user.email}
                          </div>
                          {userProfile?.role && (
                            <div className="text-xs text-primary capitalize mt-1">
                              {userProfile.role}
                            </div>
                          )}
                        </div>
                        
                        <div className="p-2">
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center space-x-2 p-2 text-left hover:bg-surface-hover rounded-lg transition-colors text-error"
                          >
                            <Icon name="LogOut" size={16} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="text-text-secondary hover:text-primary transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors font-medium"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleAuthModalClose}
          >
            <div onClick={(e) => e.stopPropagation()}>
              {authMode === 'login' ? (
                <Login 
                  onClose={handleAuthModalClose}
                  onSwitchToSignup={switchToSignup}
                />
              ) : (
                <Signup 
                  onClose={handleAuthModalClose}
                  onSwitchToLogin={switchToLogin}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;