import uuid from 'uuid/v4';

export const STORAGE_KEY = 'location-details-token';

export function remove() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function retrieve() {
  let token = sessionStorage.getItem(STORAGE_KEY);

  if (token) {
    return token;
  }

  sessionStorage.setItem(STORAGE_KEY, (token = uuid()));

  return token;
}
