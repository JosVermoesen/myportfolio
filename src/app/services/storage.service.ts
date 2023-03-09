// https://www.youtube.com/watch?v=V-BckLsfVzI
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async set(key: string, value: string) {
    await Preferences.set({ key, value });
  }

  async get(key: string) {
    const { value } = await Preferences.get({ key });
    return value;
  }

  async remove(key: string) {
    await Preferences.remove({ key });
  }

  async clear() {
    await Preferences.clear();
  }

  async keys() {
    const { keys } = await Preferences.keys();
    return keys;
  }
}
