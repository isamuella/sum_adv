// Form validation utilities - Reusable validation functions

import { PASSWORD_RULES } from '../config.js';

/**
 * Validate email format
 */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate password strength
 * @returns {object} { isValid: boolean, errors: array }
 */
function validatePassword(password) {
  const errors = [];

  if (!password || password.length < PASSWORD_RULES.minLength) {
    errors.push(`Min ${PASSWORD_RULES.minLength} characters`);
  }
  if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('One uppercase letter (A-Z)');
  }
  if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('One lowercase letter (a-z)');
  }
  if (PASSWORD_RULES.requireNumber && !/[0-9]/.test(password)) {
    errors.push('One number (0-9)');
  }
  if (PASSWORD_RULES.requireSpecialChar && !/[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('One special character (!@#$%^&*)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Update password strength meter UI
 */
function updatePasswordStrength(password) {
  const meter = document.getElementById('passwordStrengthMeter');
  const text = document.getElementById('passwordStrengthText');
  if (!meter || !text) return;

  const validation = validatePassword(password);
  
  if (!password) {
    meter.className = 'h-1 bg-gray-300 rounded transition-all';
    text.textContent = '';
  } else if (validation.isValid) {
    meter.className = 'h-1 bg-green-500 rounded transition-all';
    text.textContent = '✓ Strong password';
    text.className = 'text-xs text-green-600 mt-1';
  } else {
    meter.className = 'h-1 bg-red-500 rounded transition-all';
    text.textContent = `Needs: ${validation.errors[0]}`;
    text.className = 'text-xs text-red-600 mt-1';
  }
}

export { validateEmail, validatePassword, updatePasswordStrength };
