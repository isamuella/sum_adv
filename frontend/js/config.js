// Configuration file - Single source of truth for API URL and constants

const API_BASE_URL = 'http://localhost:4000/api';
const TOKEN_KEY = 'civic_events_token';
const USER_KEY = 'civic_events_user';

// Password validation rules for signup
const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true
};

// API endpoints (for documentation)
const ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  EVENTS: '/events',
  PROMOS: '/promos',
  ANNOUNCEMENTS: '/announcements',
  NOTIFICATIONS: '/notifications',
  USERS: '/users',
  EVENT_REGISTRATIONS: '/event-registrations',
  EVENT_FEEDBACK: '/event-feedback',
  DASHBOARD: '/dashboard'
};

export { API_BASE_URL, TOKEN_KEY, USER_KEY, PASSWORD_RULES, ENDPOINTS };