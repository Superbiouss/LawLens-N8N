function isUsableStorage(storage) {
  return Boolean(storage && typeof storage.getItem === 'function');
}

export function readJSON(storage, key, fallback = {}) {
  if (!isUsableStorage(storage)) return fallback;

  try {
    const raw = storage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(storage, key, value) {
  if (!isUsableStorage(storage)) return false;

  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function readString(storage, key, fallback = '') {
  if (!isUsableStorage(storage)) return fallback;

  try {
    const value = storage.getItem(key);
    return value == null ? fallback : value;
  } catch {
    return fallback;
  }
}

export function writeString(storage, key, value) {
  if (!isUsableStorage(storage)) return false;

  try {
    storage.setItem(key, String(value));
    return true;
  } catch {
    return false;
  }
}

export function removeKey(storage, key) {
  if (!isUsableStorage(storage)) return false;

  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function removeByPrefix(storage, prefix) {
  if (!isUsableStorage(storage)) return 0;

  let removed = 0;
  for (let index = storage.length - 1; index >= 0; index -= 1) {
    const key = storage.key(index);
    if (key && key.startsWith(prefix)) {
      storage.removeItem(key);
      removed += 1;
    }
  }

  return removed;
}
