import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription'

import { User } from '../models/User.model'
import {UserService } from '../services/user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
  
export class UserListComponent implements OnInit, OnDestroy {

  // ++ un array user de type du model User
  users: User[];
  // ++ pattern Subscription
  userSubscription: Subscription;

  constructor(
    // ++ on injecte le service
    private userService: UserService) { }
  
  ngOnInit() {
    // ++ on subscris au Subject contenu dans le service
    this.userSubscription = this.userService.userSubject.subscribe(
      // ++ qui va emettre un array de type du modèle User
      (users: User[]) => {
        this.users = users
      }
    )
    // ++ on emets le user
    this.userService.emitUsers();
  }

  // ++ ne pas oublier le OnDestroy
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }

  onSaveUsers() {
    this.userService.saveUsersToServer();
  }
  
  onFetchUsers() {
    this.userService.getUsersFromServer()
  }
}
