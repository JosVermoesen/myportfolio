import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listData = [];

  constructor(private dataService: DataService) {
    this.loadData();
  }

  async loadData() {
    this.listData = await this.dataService.getData();
  }

  async addData() {
    await this.dataService.addData(`Simon ${Math.floor(Math.random() * 100)}`);
    this.loadData();
  }

  async removeItem(index: number) {
    await this.dataService.removeItem(index);
    this.listData.splice(index, 1);
  }
}
