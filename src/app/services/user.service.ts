import { User } from '../models/User.model'
import { Subject } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
  
// ++ users: de type du model User[] = un array
export class UserService {
  private users: User[] = [
    // {
    //   firstName: 'Will',
    //   lastName: 'Alexander',
    //   email: 'will@will.com',
    //   drinkPreference: 'jus d\'orange',
    //   hobbies: [
    //     'coder',
    //     'boire du café'
    //   ]
    // }
    
    // new User(
    //   'Will',
    //   'Alexander',
    //   'will@will.com',
    //   'jus d\'orange',
    //   [
    //     'coder',
    //     'boire du café'
    //   ]
    // )
  ];

  // ++ créer userSubjec, en utilisant le pattern Subject, qui emettre des arrays d'objets selon le model User
  userSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) { }
  
  getUsersFromServer() {
    this.httpClient
      .get<any[]>('https://monprojetangular-opc.firebaseio.com/users.json')
      .subscribe(
        (response => {
          this.users = response;
          this.emitUsers()
        }),
        (error) => {
          console.log('Erreur : ' + error)
        }
    )
  }
  
  saveUsersToServer() {
    this.httpClient
      // + 1er argument : cible (BDD)
      // + 2ème : origine (appareils)

      // + .post : rajoute chaque fois tous les nouveaux node, contenants l'array complèt
      // , .post('https://monprojetangular-opc.firebaseio.com/users.json', this.appareils)

      // + .put, écrase et remplace le précédent.
      // + ON PEUT L'UTILISER AUSSI POUR LA CRÉATION (.post) !!!
      .put('https://monprojetangular-opc.firebaseio.com/users.json', this.users)

      // + .subscribe : gère les éventuels erreurs
      .subscribe(
        () => {
          console.log('Enregistrement terminé');
        },
        (error) => {
          console.log('Erreur : ' + error);
        }
    )
  }

  // ++ créer méthode qui va émettre le Subject
  // ++ qui va appeler la méthode .next
  // ++ qui va émettre une copie de users avec .slice()
  emitUsers() {
    this.userSubject.next(
      this.users.slice()
    );
  }

  // ++ méthode qui prendra user comme argument
  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }

}