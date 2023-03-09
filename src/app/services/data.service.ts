import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'mylist';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    console.log('init');
    await this.storage.create();
    console.log('init done');
  }

  getData() {
    console.log('getData');
    return this.storage.get(STORAGE_KEY) || [];
  }

  async addData(item: any) {
    const storeData = (await this.storage.get(STORAGE_KEY)) || [];
    storeData.push(item);
    return this.storage.set(STORAGE_KEY, storeData);
  }

  async removeItem(index: number) {
    const storeData = (await this.storage.get(STORAGE_KEY)) || [];
    storeData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, storeData);
  }
}
