import Storage from 'expo-sqlite/kv-store';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';

/**
 * Small key-value storage (settings, flags). Backed by SQLite, works offline, survives restarts.
 * For real app data (lists, records) use the database in `@/lib/db`.
 * For secrets/tokens use `expo-secure-store`.
 */
export const kv = {
  get: (key: string) => Storage.getItemSync(key),
  set: (key: string, value: string) => Storage.setItemSync(key, value),
  remove: (key: string) => Storage.removeItemSync(key),
};

const zustandStateStorage: StateStorage = {
  getItem: (name) => Storage.getItemSync(name),
  setItem: (name, value) => Storage.setItemSync(name, value),
  removeItem: (name) => {
    Storage.removeItemSync(name);
  },
};

/** Pass to zustand's `persist` middleware: `storage: zustandStorage`. */
export const zustandStorage = createJSONStorage(() => zustandStateStorage);
