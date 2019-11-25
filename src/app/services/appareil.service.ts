// -import {Subject} from 'rxjs/Subject'
import { Subject } from 'rxjs'

export class AppareilService {

  appareilSubject = new Subject<any[]>()

  // + private rend l'array un Subject qui empêche l'accès et la manipulation aux composants pas autorisés
  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      id: 2,
      name: 'Frigo',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice())
  }
  
  // +++++++ afin de trouver le params :id dans le json
  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id
      }
    )
    return appareil
  }

  switchOnOne(i: number) {
    this.appareils[i].status = "allumé"
    this.emitAppareilSubject()
  }


  switchOffOne(i: number) {
    this.appareils[i].status = "éteint"
    this.emitAppareilSubject()
  }

  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé'
    }
    this.emitAppareilSubject()
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint'
      this.emitAppareilSubject()
    }
  }
}