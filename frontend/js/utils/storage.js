// Storage utilities - Safe wrapper for localStorage (can be enhanced later)

/**
 * Safe get from localStorage (with error handling)
 */
function getStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Storage get error:', error);
    return null;
  }
}

/**
 * Safe set to localStorage
 */
function setStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Storage set error:', error);
    return false;
  }
}

/**
 * Safe remove from localStorage
 */
function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Storage remove error:', error);
    return false;
  }
}

/**
 * Safe clear localStorage
 */
function clearStorage() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Storage clear error:', error);
    return false;
  }
}

export { getStorage, setStorage, removeStorage, clearStorage };
