import { Component, OnInit } from '@angular/core';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {Project} from '../projects/project';
import {Person} from '../persons/person';
import {Intervention} from './intervention';
import {InterventionService} from '../services/intervention.service';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss']
})


export class InterventionsComponent implements OnInit {
  interventions :Intervention[];
  persons : Person[];
  projects : Project [];

  intervention : Intervention= {
    interventionId:null,
    startDate : null,
    endDate : null ,
    worked : null,
    person : null,
    project : null

}

  project: Project={
    projectId: null,
    projectName:'',
    client:null,
  }

  person: Person = {
    personId: null,
    firstName: '',
    lastName: '',
    manager:null
  }
  personId;
  projectId;
  constructor(private personService:PersonService , private projectService:ProjectService, private interventionService:InterventionService) { }

  ngOnInit() {
    this.getAllPersons();
    this.getAllProject();
    this.getAllInterventions()

  }

getAllInterventions(){

    this.interventionService.getInterventions().subscribe((data:Intervention[])=>{

      this.interventions=data
    })
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

  addIntervention(data:Intervention){
    console.log(data);

this.interventionService.saveIntervention(data,this.projectId,this.personId);

  }

}
