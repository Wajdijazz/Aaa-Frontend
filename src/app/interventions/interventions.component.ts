import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {Project} from '../entities/project';
import {Person} from '../entities/person';
import {Intervention} from '../entities/intervention';
import {InterventionService} from '../services/intervention.service';
import {DetailsComponent} from '../details/details.component';
import {MatDialog} from '@angular/material/dialog';
import {CalendarComponent} from '../calendar/calendar.component';


@Component({
    selector: 'app-interventions',
    templateUrl: './interventions.component.html',
    styleUrls: ['./interventions.component.scss']
})


export class InterventionsComponent implements OnInit {

    interventions: Intervention[];
    persons: Person[];
    projects: Project [];

    selectedPerson: Person;
    selectedProject: Project;
    selectedDayToAdd: Array<Intervention>; // Tableau d'interventions des jours selectionnes

    constructor(public dialog: MatDialog, private personService: PersonService,
                private projectService: ProjectService,
                private interventionService: InterventionService) {
    }

    ngOnInit() {
        this.getAllPersons();
        this.getAllProject();
        this.getAllInterventions();
    }

    getAllInterventions() {
        this.interventionService.getInterventions().subscribe((data: Intervention[]) => {
            this.interventions = data;
        })

    }

    getAllPersons() {
        this.personService.getPersons().subscribe((data: Person[]) => {
            this.persons = data;
        })
    }

    getAllProject() {
        this.projectService.getProjects().subscribe((data: Project[]) => {
            this.projects = data;
        })
    }

    addIntervention(data: Array<Intervention>, project: Project, person: Person) {
        data.forEach(int => {
            int.project = project;
            int.person = person;
        });
        this.interventionService.saveIntervention(data, project, person);
    }

    /**
     * Permet de gérer l'évènement émit par CalendarComponent lorsque l'on selectionne un jour
     * @param interventions
     */
    selectedDayChangedHandler(interventions: Array<Intervention>) {
        this.selectedDayToAdd = interventions;
    }

    deleteIntervention(personId, projectId) {
        this.interventionService.deleteInterventions(personId, projectId);
    }

    /**
     * Cette focntion permet d'ouvrire un poup et afficher les detaills de l'intervention dans le composant details
     * @param intervention
     */
    openDialog(intervention): void {
        const dialogRef = this.dialog.open(DetailsComponent, {
            width: '900px',
            data: {person: intervention.person, project: intervention.project}
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
