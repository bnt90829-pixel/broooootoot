/**
 * Safe Storage helper with in-memory fallback
 * Ensures the app never crashes if localStorage or sessionStorage is restricted in iframes
 */

const memoryStore = new Map<string, string>();
const sessionMemoryStore = new Map<string, string>();

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      const val = window.localStorage.getItem(key);
      if (val !== null) return val;
    } catch {
      // Access denied or sandboxed
    }
    return memoryStore.get(key) || null;
  },

  setItem: (key: string, value: string): void => {
    memoryStore.set(key, value);
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Access denied or quota exceeded
    }
  },

  removeItem: (key: string): void => {
    memoryStore.delete(key);
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore
    }
  },

  getSessionItem: (key: string): string | null => {
    try {
      const val = window.sessionStorage.getItem(key);
      if (val !== null) return val;
    } catch {
      // Access denied or sandboxed
    }
    return sessionMemoryStore.get(key) || null;
  },

  setSessionItem: (key: string, value: string): void => {
    sessionMemoryStore.set(key, value);
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      // Access denied or quota exceeded
    }
  },
};
