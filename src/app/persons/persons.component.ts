import { Component, OnInit } from '@angular/core';
import {Person} from './person';
import {Observable} from 'rxjs';
import {PersonService} from '../services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {


  constructor(private personService:PersonService) { }

  ngOnInit() {
  }

}
