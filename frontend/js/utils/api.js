// API Utility - Smart fetch wrapper that handles auth, errors, and responses

import { API_BASE_URL, TOKEN_KEY, USER_KEY } from '../config.js';
import { showError, showSuccess } from './ui-helpers.js';

/**
 * Make an API call with automatic auth header, error handling, and response parsing
 * @param {string} endpoint - e.g., '/events', '/auth/login'
 * @param {object} options - fetch options { method, body, headers, suppressError: true/false, etc }
 * @returns {Promise} - JSON response data or null on error
 */
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const suppressError = options.suppressError === true; // Extract and remove from options
  
  // Prepare headers with Authorization
  const headers = { ...options.headers };
  const token = localStorage.getItem(TOKEN_KEY);
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle different content types
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    // Handle 401 Unauthorized - token expired
    if (response.status === 401) {
      logoutUser();
      if (!suppressError) {
        showError('Session expired. Please log in again.');
      }
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 1000);
      return null;
    }

    // Handle 403 Forbidden
    if (response.status === 403) {
      if (!suppressError) {
        showError('You do not have permission to perform this action.');
      }
      return null;
    }

    // Check if response is actually JSON before parsing
    const contentType = response.headers.get('content-type');
    let data;
    
    try {
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If not JSON, backend isn't responding correctly
        console.error(`Unexpected response format. Status: ${response.status}, Content-Type: ${contentType}`);
        if (!suppressError) {
          showError(`Server error (${response.status}). Please ensure the server is running.`);
        }
        return null;
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      if (!suppressError) {
        showError(`Invalid server response. Please ensure the backend server is running on port 4000.`);
      }
      return null;
    }

    // Check if response is an error
    if (!response.ok) {
      const errorMsg = data.message || data.error || `Error: ${response.status}`;
      if (!suppressError) {
        showError(errorMsg);
      }
      return null;
    }

    // Normalize backend wrapper while keeping backward compatibility with legacy callers
    // that still expect response.data.
    const payload = data && Object.prototype.hasOwnProperty.call(data, 'data') ? data.data : data;

    // For debugging - log successful API calls
    console.log(`✓ API Call Success: ${endpoint}`, { status: response.status, payload });

    if (payload && typeof payload === 'object') {
      // Attach a non-enumerable self-reference so both usage styles work:
      // - new style: response
      // - legacy style: response.data
      if (!Object.prototype.hasOwnProperty.call(payload, 'data')) {
        Object.defineProperty(payload, 'data', {
          value: payload,
          writable: false,
          enumerable: false,
          configurable: true
        });
      }

      // Also attach status for better response checking
      if (!Object.prototype.hasOwnProperty.call(payload, 'status')) {
        Object.defineProperty(payload, 'status', {
          value: response.status,
          writable: false,
          enumerable: false,
          configurable: true
        });
      }
    }

    return payload;
  } catch (error) {
    console.error('API Error:', error);
    if (!suppressError) {
      showError(error.message || 'Network error. Please check your connection.');
    }
    return null;
  }
}

/**
 * Logout user - clear localStorage and reset global state
 */
function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.appState.user = null;
  window.appState.token = null;
  window.appState.isAuthenticated = false;
  console.log('✓ User logged out');
}

export { apiCall, logoutUser };
