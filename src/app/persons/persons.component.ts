import { Component, OnInit } from '@angular/core';
import {Person} from './person';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  persons: Observable<Person[]>;

  constructor() { }

  ngOnInit() {
  }

}
