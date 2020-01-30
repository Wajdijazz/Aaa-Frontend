import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InterventionService} from '../services/intervention.service';
import {Intervention} from '../interventions/intervention';
import {Person} from '../persons/person';
import {Project} from '../projects/project';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  interventionsByPerson : Intervention[];
  persons : Person[];
  projects : Project [];

  intervention : Intervention= {
    interventionId:null,
    date : null,
    person : null,
    project : null,
    mode : null,

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
  worked;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private interventionService:InterventionService ) { }

  ngOnInit() {
    this.getInterventionsByPersonAndProject();
   this.getWorkedByPeronAndProject();
    console.log(this.data.person.personId);
    console.log(this.data.project.projectId);
    console.log(this.worked);
  }

  getInterventionsByPersonAndProject(){
    this.interventionService.getInterventionsByPersonAndProject( this.data.project.projectId , this.data.person.personId ).subscribe((data:Intervention[])=>{
      this.interventionsByPerson=data;
      console.log(this.interventionsByPerson);
    })
  }

 getWorkedByPeronAndProject(){
    this.interventionService.getWorkedByPersonAndProject( this.data.project.projectId, this.data.person.personId).subscribe((data: number)=>{
      this.worked=data / 2;
    console.log(this.worked)})
 }


  deletIntervention(interventionId){
    this.interventionService.deleteIntervention(interventionId);
    console.log(interventionId);
    this.ngOnInit();
  }
}
