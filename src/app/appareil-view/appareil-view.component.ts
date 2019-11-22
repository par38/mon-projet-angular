import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service'

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  isAuth = false;

  // + array comprenant tous appareils et leurs status
  // + AU PLURIEL !
  appareils: any[];

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
    this.appareils = this.appareilService.appareils
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
}
