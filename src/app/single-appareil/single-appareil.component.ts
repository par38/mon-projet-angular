import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { AppareilService } from '../services/appareil.service'

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {

  name: string = 'Appareil'
  status: string = 'Statut'

  constructor(
    private appareilService: AppareilService,

    // +++++++ afin de reconnaître le params :id
    private route: ActivatedRoute) { }

  ngOnInit() {
    // +++++++ afin de reconnaître le params :id
    // this.name = this.route.snapshot.params['id']
    const id = this.route.snapshot.params['id']  // +++ où id est un string

    // ++++++ .getAppareilById: méthode définie in appareil.service.ts
    this.name = this.appareilService.getAppareilById(+id).name    // ++++++ +id le cast en number
    this.status = this.appareilService.getAppareilById(+id).status
  }

}
