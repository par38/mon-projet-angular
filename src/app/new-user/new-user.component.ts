import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { Router } from '@angular/router'

import { UserService } from '../services/user.service'
import { User } from '../models/User.model'

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  // ++ pour créer l'objet formulaire :
  // ++ dans un formulaire template, appeler NgForm
  // ++ dans un reactif : FormGroup + FormControl
  userForm: FormGroup;

  constructor(
    // ++ FormBuilder : outil aidant à la création de formulaires
    private formBuilder: FormBuilder,

    // ++ pour la création d'un nouveau user
    private userService: UserService,

    private router: Router
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() { 
    this.userForm = this.formBuilder.group({
      // ++ Validators existants + possibilité d'en créer de personnels
      // ++ Regex ??
      // ++ controles - attention : required SANS parenthèses !!
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      // ++ si plusieurs validateurs, dans un []
      email: ["", [Validators.required, Validators.email]],
      drinkPreference: ["", Validators.required],

      // ++ hobbies : optionnel + plusieurs inputs possibles
      // ++ formBuilder.array à l'intérieur du formBuilder.group
      hobbies: this.formBuilder.array([])
    })
  }

  onSubmitForm() {

    // ++ this.userForm.value reçoit toutes les informations du initForm
    const formValue = this.userForm.value;

    // ++ crée un new User, selon le modèle
    const newUser = new User(

      // ++ formValue : constante créée 2 lignes plus haut
      // ++ autre syntaxe, dot ou brakets
      formValue.firstName,
      // formValue['firstName'], 
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],

      // ++ SI hobbies > hobbies, sinon []
      formValue['hobbies'] ? formValue['hobbies'] : []
    )
    // ++ l'ajoute
    this.userService.addUser(newUser)

    // ++ redirige vers la liste des users
    this.router.navigate(['/users'])
  }

  // ++ pour des règles de typage strict
  // ++ avec le verbe .get
  getHobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  // ++ crée un control sur l'ajout d'hobby
  // ++ et le pousse vers l'array FormArray 
  onAddHobby() {
    const newHobbyControl = this.formBuilder.control("", Validators.required)
    this.getHobbies().push(newHobbyControl)
  }

}
