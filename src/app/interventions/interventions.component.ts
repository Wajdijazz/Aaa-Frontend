import {Component, OnInit} from '@angular/core';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {Project} from '../projects/project';
import {Person} from '../persons/person';
import {Intervention} from './intervention';
import {InterventionService} from '../services/intervention.service';
import {DetailsComponent} from '../details/details.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {element} from 'protractor';

@Component({
    selector: 'app-interventions',
    templateUrl: './interventions.component.html',
    styleUrls: ['./interventions.component.scss']
})


export class InterventionsComponent implements OnInit {
    interventions: Intervention[];
    newArr = []
    persons: Person[];
    projects: Project [];
    intervention: Intervention = {
        interventionId: null,
        date: null,
        person: null,
        project: null,
        mode: null,
    }
    project: Project = {
        projectId: null,
        projectName: '',
        client: null,
    }
    person: Person = {
        personId: null,
        firstName: '',
        lastName: '',
        manager: null
    }
    personId;
    projectId;
    private result: any;
    private listIntervention: any;

    constructor(public dialog: MatDialog, private personService: PersonService, private projectService: ProjectService,
                private interventionService: InterventionService) {
    }

    ngOnInit() {
        this.getAllPersons();
        this.getAllProject();
        this.getAllInterventions()

    }

    filterData(dataList: Intervention[], id1, id2) {
        dataList.forEach((item, index) => {
            if (this.newArr.findIndex(i => i.id1 == item.person.id1
                && i.project.id2 == item.project.id2) === -1) {
                this.newArr.push(item)
            }
        });
    }

    getAllInterventions() {
        this.interventionService.getInterventions().subscribe((data: Intervention[]) => {
            this.interventions = data;
            this.filterData(this.interventions, this.person.personId, this.project.projectId)
        })
    }

    getAllPersons() {
        this.personService.getPersons().subscribe((data: Person[]) => {
            this.persons = data;
        })
    }

    getAllProject() {
        this.projectService.getProjects().subscribe((data: Project[]) => {
            this.projects = data
        })
    }

    selectProject(projectId) {
        this.projectId = projectId;
        console.log(projectId);
    }

    selectPerson(personId) {
        this.personId = personId;
        console.log(personId);
    }

    addIntervention(data: Intervention) {
        console.log(data);
        this.interventionService.saveIntervention(data, this.projectId, this.personId);
        window.location.reload();
    }

    deletIntervention(personId, projectId) {
        this.interventionService.deleteIntervention(personId, projectId);
        window.location.reload();
    }

    openDialog(intervention): void {
        let dialogRef = this.dialog.open(DetailsComponent, {
            width: '900px',
            data: {person: intervention.person, project: intervention.project}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
