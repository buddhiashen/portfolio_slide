import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Login = ({ onClose, onSwitchToSignup }) => {
  const { signIn, authError, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (authError) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn(formData.email, formData.password);
    
    if (result?.success) {
      onClose?.();
    }
    
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-surface rounded-2xl p-8 max-w-md w-full mx-4"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Welcome Back
        </h2>
        <p className="text-text-secondary">
          Sign in to manage your portfolio content
        </p>
      </div>

      {/* Error Display */}
      {authError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4"
        >
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span className="text-error text-sm">{authError}</span>
          </div>
        </motion.div>
      )}

      {/* Demo Credentials */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} color="var(--color-primary)" />
          <span className="text-primary text-sm font-medium">Demo Credentials</span>
        </div>
        <div className="text-xs text-text-secondary space-y-1">
          <div>Admin: admin@portfolioslide.com / admin123</div>
          <div>User: user@portfolioslide.com / user123</div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              disabled={loading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
              disabled={loading}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading || !formData.email || !formData.password}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span>Signing In...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Icon name="LogIn" size={16} />
              <span>Sign In</span>
            </div>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-text-secondary text-sm">
          Do not have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-primary hover:text-primary-hover font-medium transition-colors"
            disabled={loading}
          >
            Sign up here
          </button>
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary transition-colors"
        disabled={loading}
      >
        <Icon name="X" size={20} />
      </button>
    </motion.div>
  );
};

export default Login;