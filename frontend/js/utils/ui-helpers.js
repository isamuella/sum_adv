// UI Helper functions - Toasts, loaders, and common UI patterns

/**
 * Show error toast notification (red)
 */
function showError(message, duration = 4000) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm';
  toast.innerHTML = `
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/**
 * Show success toast notification (green)
 */
function showSuccess(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm';
  toast.innerHTML = `
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/**
 * Show loading toast (blue, no auto-dismiss)
 */
function showLoading(message) {
  const toast = document.createElement('div');
  toast.id = 'loadingToast';
  toast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm';
  toast.innerHTML = `
    <div class="flex items-center space-x-2">
      <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(toast);
  return toast;
}

/**
 * Hide loading toast
 */
function hideLoading() {
  const toast = document.getElementById('loadingToast');
  if (toast) toast.remove();
}

/**
 * Confirm dialog (simple)
 */
function confirm(message) {
  return window.confirm(message);
}

export { showError, showSuccess, showLoading, hideLoading, confirm };
