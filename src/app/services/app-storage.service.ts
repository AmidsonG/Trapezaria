import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {

  constructor(private storage: Storage) { }
  
  async set(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  async get(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  async remove(key: string): Promise<void> {
    await this.storage.remove(key);
  }
}
