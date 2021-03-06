import { Subject } from 'rxjs/Subject'

export class AppareilService {

  appareilSubject = new Subject<any[]>()

  // ++ private rend l'array un Subject qui empêche l'accès et la manipulation aux composants pas autorisés
  // - private appareils = [   
    // / ERROR in src/app/appareil-view/appareil-view.component.ts(44,43): error TS2341: Property 'appareils' is private and only accessible within class 'AppareilService'.
  
  appareils = [
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

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: "",
      status:""
    }
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject()
  }
}