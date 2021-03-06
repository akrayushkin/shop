import { Injectable, InjectionToken } from '@angular/core';

export enum LocalStorageKeys {
  id = 'id',
  name = 'name',
  cart = 'cart',
  appSettings = 'app-settings'
}

export const STORAGE = new InjectionToken<LocalStorageService>('Storage');

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  set(key: LocalStorageKeys, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: LocalStorageKeys): string {
    return localStorage.getItem(key);
  }

  remove(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }

  clear(): void{
    localStorage.clear();
  }
}
