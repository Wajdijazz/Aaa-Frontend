import { Component, OnInit } from '@angular/core';
import {ClientService} from '../services/client.service';
import {Client} from '../clients/client';
import {Project} from '../projects/project';
import {Person} from '../persons/person';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-tjs',
  templateUrl: './tjs.component.html',
  styleUrls: ['./tjs.component.scss']
})
export class TjsComponent implements OnInit {
  persons: Person[];
  projects: Project[];

  project: Project={
    projectId: null,
    projectName:'',
    client: null
}

  person: Person = {
  personId: null,
  firstName: '',
  lastName: ''
}
  personId;
  projectId;
constructor(private personService:PersonService , private projectService:ProjectService) { }

  ngOnInit() {
  this.getAllPersons();
  this.getAllProject();
  }

  getAllPersons(){
  this.personService.getPersons().subscribe((data:Person[])=>{
    this.persons=data;
  })
}

getAllProject(){
  this.projectService.getPerojects().subscribe((data:Project[])=>{
    this.projects=data
  })
}

selectProject(projectId){
  this.projectId=projectId;
}

  selectPerson(personId){
    this.personId=personId;
  }


}
