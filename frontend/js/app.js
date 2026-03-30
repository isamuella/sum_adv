import { TOKEN_KEY, USER_KEY } from './config.js';

// Global app state object - initialize immediately
function initializeApp() {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);

  window.appState = {
    user: null,
    token: null,
    isAuthenticated: false
  };

  if (token && user) {
    try {
      window.appState.token = token;
      window.appState.user = JSON.parse(user);
      window.appState.isAuthenticated = true;
      console.log('App initialized - User logged in:', window.appState.user);
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  } else {
    window.appState.isAuthenticated = false;
    console.log('App initialized - No user logged in');
  }
}

// Initialize immediately when module loads
initializeApp();

// Re-initialize when DOM is ready as well
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
}

export { initializeApp };