import {Component, OnInit} from '@angular/core';
import {Project} from '../projects/project';
import {Person} from '../persons/person';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {Tj} from './tj';
import {TjService} from '../services/tj.service';
import {UpdateProjectComponent} from '../updates-data/update-project/update-project.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateTjComponent} from '../updates-data/update-tj/update-tj.component';

@Component({
    selector: 'app-tjs',
    templateUrl: './tjs.component.html',
    styleUrls: ['./tjs.component.scss']
})
export class TjsComponent implements OnInit {
    persons: Person[];
    projects: Project[];
    tjs: Tj[];

    tj: Tj = {
        tjId: null,
        tarif: null,
        person: null,
        project: null,
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

    constructor(private personService: PersonService, private projectService: ProjectService,
                private tjService: TjService,public dialog: MatDialog) {
    }

    ngOnInit() {
        this.getAllPersons();
        this.getAllProject();
        this.getAllTjs();
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
    }

    selectPerson(personId) {
        this.personId = personId;
    }

    addTj(data: Tj) {
        this.tjService.saveTj(data, this.projectId, this.personId);
        window.location.reload();
    }

    getAllTjs() {
        this.tjService.getTjs().subscribe((data: Tj[]) => {
            this.tjs = data;
        })
    }

    deletTj(tjId) {
        this.tjService.deleteTj(tjId)
        window.location.reload();
    }
    updateTj(tj): void {
        let dialogRef = this.dialog.open(UpdateTjComponent, {
            width: '900px',
            data: {tj}
        });
        dialogRef.afterClosed().subscribe(result => {
        });

    }

}
