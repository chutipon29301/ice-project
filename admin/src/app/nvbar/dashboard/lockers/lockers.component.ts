import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-lockers',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.css']
})

export class LockersComponent implements OnInit {

  lockers = [
    {
      name: 'Engineer',
      number: 1,
      available: true,
    },
    {
      name: 'Medicine',
      number: 2,
      available: true,
    },
    {
      name: 'Art',
      number: 3,
      available: false,
    },
    {
      name: 'Engineer',
      number: 1,
      available: true,
    },
    {
      name: 'Medicine',
      number: 2,
      available: true,
    },
    {
      name: 'Art',
      number: 3,
      available: false,
    },
    {
      name: 'Engineer',
      number: 1,
      available: true,
    },
    {
      name: 'Medicine',
      number: 2,
      available: true,
    },
    {
      name: 'Art',
      number: 3,
      available: false,
    }
  ];
  constructor() { }

   modal: HTMLElement;
   btn: HTMLElement;
   span: Element;
  ngOnInit() {
  this.modal = document.getElementById('myModal');
  this.btn = document.getElementById('myBtn');
  this.span = document.getElementsByClassName('close')[0];
  }

  close(e) {
    this.modal.style.display = 'none';
  }
  open(e) {
    this.modal.style.display = 'block';
  }

}
