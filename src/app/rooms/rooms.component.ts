import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  items = [
    'Item 0',
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13'
  ]

  
  constructor() { }

  ngOnInit(): void {
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  //   console.log(this.items);
  //   console.log(event.previousIndex);

  //   console.log(event.currentIndex);
  // }


  drop(event: CdkDragDrop<any>) {
    this.items[event.previousContainer.data.index]=event.container.data.item
    this.items[event.container.data.index]=event.previousContainer.data.item
  }

}
