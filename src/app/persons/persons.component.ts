import { Component, OnInit } from '@angular/core';
import {Person} from './person';
import {Observable} from 'rxjs';
import {PersonService} from '../services/person.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
persons:Person[];
person:Person={

  personId:null,
  firstName:'',
  lastName:''
}
  constructor(private personService:PersonService,private router: Router) { }

  ngOnInit() {
  this.getAllPersons()
  }

  getAllPersons(){

    this.personService.getPersons().subscribe((data:Person[])=>{
      this.persons=data;
      console.log((this.persons))
    })


  }
addPerson(data:Person){
  this.personService.savePerson(data)
  this.router.navigateByUrl(`persons`);
  this.getAllPersons()



}

}
