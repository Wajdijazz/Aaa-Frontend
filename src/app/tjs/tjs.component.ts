import { Component, OnInit } from '@angular/core';
import {Project} from '../projects/project';
import {Person} from '../persons/person';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {Tj} from './tj';
import {TjService} from '../services/tj.service';

@Component({
  selector: 'app-tjs',
  templateUrl: './tjs.component.html',
  styleUrls: ['./tjs.component.scss']
})
export class TjsComponent implements OnInit {
  persons: Person[];
  projects: Project[];
  tjs : Tj[];

  tj : Tj= {
    tjId : null ,
    tarif : null ,
    person :null,
    project : null,

  }

  project: Project={
    projectId: null,
    projectName:'',
    client:null,
}

  person: Person = {
  personId: null,
  firstName: '',
  lastName: ''
}
  personId;
  projectId;
constructor(private personService:PersonService , private projectService:ProjectService , private tjService:TjService) { }

  ngOnInit() {
  this.getAllPersons();
  this.getAllProject();
  this.getAllTjs();
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
  console.log(projectId);
}

selectPerson(personId){
  this.personId=personId;
  console.log(personId);
  }

addTj(data:Tj){
  console.log(this.projectId);
  console.log(this.personId);
  this.tjService.saveTj(data,this.projectId,this.personId);
  window.location.reload();
}


getAllTjs(){
  this.tjService.getTjs().subscribe((data:Tj[])=>{
    this.tjs=data;
    console.log(this.tjs);

  })


}
  deletTj(tjId){
    this.tjService.deleteTj(tjId);
    console.log(tjId);
  //  window.location.reload();

  }
}