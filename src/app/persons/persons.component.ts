import { Component, OnInit } from '@angular/core';
import {Person} from './person';
import {Observable} from 'rxjs';
import {PersonService} from '../services/person.service';
import {Router} from '@angular/router';
import {Manager} from '../managers/manager';
import {ManagerService} from '../services/manager.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
persons:Person[];
managers:Manager[];
manager:Manager={
  managerId:null,
  firstName:'',
  lastName:''
}
Idmanager;
person:Person={

  personId:null,
  firstName:'',
  lastName:'',
  manager:null
}
  constructor(private personService:PersonService,private managerService:ManagerService,private router: Router) {
    this.getAllPersons()


  }

  ngOnInit() {
  this.getAllManagers()
  }

  getAllPersons(){

    this.personService.getPersons().subscribe((data:Person[])=>{
      this.persons=data;
      console.log((this.persons))
    })


  }


  getAllManagers(){
this.managerService.getManagers().subscribe((data:Manager[])=>{
  this.managers=data
})

  }

  deletPerson(personId){
  this.personService.deletePerson(personId)
    this.getAllPersons()
   window.location.reload();


  }

  selectManager(managerId){
  console.log((managerId))
    this.Idmanager=managerId
  }

  addPerson(data:Person){
    this.personService.savePerson(data,this.Idmanager)
    window.location.reload();
    this.getAllPersons()
  }
}
