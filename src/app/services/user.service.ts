import { User } from '../models/User.model'
import { Subject } from 'rxjs'

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
    
    new User(
      'Will',
      'Alexander',
      'will@will.com',
      'jus d\'orange',
      [
        'coder',
        'boire du café'
      ]
    )
  ];

  // ++ créer userSubjec, en utilisant le pattern Subject, qui emettre des arrays d'objets selon le model User
  userSubject = new Subject<User[]>();

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