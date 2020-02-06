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
    interventionsByPerson: Intervention[];
    persons: Person[];
    projects: Project [];

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
    worked;
    private dateTest: Date;

    private dateList = [{id: null, key: '', value: null}];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private interventionService: InterventionService) {
    }

    ngOnInit() {
        this.getInterventionsByPersonAndProject();
        this.getWorkedByPeronAndProject();
    }



    /**
     * Cette fonction permet de récuperer tous les interventions auprés de serveur et corriger le problémes de décalages des dates
     */
    getInterventionsByPersonAndProject() {
        this.interventionService.getInterventionsByPersonAndProject(this.data.project.projectId, this.data.person.personId)
            .subscribe((data: Intervention[]) => {
                this.interventionsByPerson = data;
                this.interventionsByPerson.forEach(element => {
                    this.dateTest = new Date(element.date)
                    this.dateTest.setDate(this.dateTest.getDate() + 1)
                    this.dateList.push({id: element.interventionId, key: element.mode, value: this.dateTest})
                })
            })
        this.dateList = []

    }

    getWorkedByPeronAndProject() {
        this.interventionService.getWorkedByPersonAndProject(this.data.project.projectId, this.data.person.personId)
            .subscribe((data: number) => {
                this.worked = data / 2;
            })
    }

    deletIntervention(interventionId) {
        this.interventionService.deleteInterventionHistorique(interventionId);
        this.ngOnInit()
    }

}
