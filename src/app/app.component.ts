import { Component, OnInit, OnDestroy } from '@angular/core';
// -import { Observable } from 'rxjs'
// -import 'rxjs/add/observable/interval'
import { interval } from 'rxjs'
import { Subscription } from 'rxjs/Subscription';


// import { AppareilService } from './services/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // title = 'mon-projet-angular';
  // isAuth = false;

  // + sans async en .html
  // lastUpdate = new Date()

  // + Promise, nécessite d'un | async en .html
  // lastUpdate = new Promise((resolve, reject) => {
  //   const date = new Date()
  //   setTimeout(() => {
  //     resolve(date)
  //   }, 2000     // après 2 secondes
  //   )
  // })

  // appareilOne = 'Machine à laver';
  // appareilTwo = 'Frigo';
  // appareilThree = 'Ordinateur';

  // + array comprenant tous appareils et leurs status
  // + AU PLURIEL !
  // appareils: any[];

  // constructor() {
  //   setTimeout(
  //     () => {
  //       this.isAuth = true;
  //     }, 4000
  //   );
  // }

  secondes: number
  counterSubscription: Subscription

  constructor(
    // private appareilService: AppareilService
  ) {
    // setTimeout(
    //   () => {
    //     this.isAuth = true;
    //   }, 4000
    // );
  }

  ngOnInit() {
    // -  const counter = Observable.interval(1000)
    // + Interval + subscribe
    const counter = interval(1000)
    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.secondes = value
      },
      (error) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Interval completed!')
      }
    )
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe()
  }
    // + On rempli le tableau vide "this.appareils" avec le contenu de l'array "this.appareilService.appareils" de appareilService 
    // this.appareils = this.appareilService.appareils
  // }

}
