import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  isAuth = false;

  // + array comprenant tous appareils et leurs status
  // + AU PLURIEL !
  appareils: any[];
  appareilSubscription: Subscription

  // + Promise, nécessite d'un | async en .html
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date()
    setTimeout(() => {
      resolve(date)
    }, 2000     // après 2 secondes
    )
  })

  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }


  ngOnInit() {
    // On rempli le tableau vide "this.appareils" avec le contenu de l'array "this.appareilService.appareils" de appareilService 
    // this.appareils = this.appareilService.appareils
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
      this.appareils = this.appareils
      }
    )
    this.appareilService.emitAppareilSubject()
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if (confirm('Etes-vous sûr de vouloir tout éteindre ?')) {
      this.appareilService.switchOffAll()
    } else {
      return null
    }
  }
  ngOnDestroy() {
    this.appareilSubscription.unsubscribe()
  }
}
