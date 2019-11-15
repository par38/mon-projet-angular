import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  // + déclaration variables typées
  // appareilName: string = 'Machine à laver';
  // + modifiable par input form
  @Input() appareilName: string;

  // appareilStatus: string = 'éteint';
  @Input() appareilStatus: string;

  constructor() { }

  ngOnInit() {
  }
  // + fonction - interpolation
  getStatus() {
    return this.appareilStatus;
  }

  getColor() {
    if (this.appareilStatus === 'allumé') {
      return 'green';
    } else if (this.appareilStatus === 'éteint') {
      return 'red';
    }
  }

}
