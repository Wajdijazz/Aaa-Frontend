import {Component, Inject, OnInit} from '@angular/core';
import {Person} from '../../persons/person';
import {Project} from '../../projects/project';
import {Tj} from '../../tjs/tj';
import {PersonService} from '../../services/person.service';
import {ProjectService} from '../../services/project.service';
import {TjService} from '../../services/tj.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
    selector: 'app-update-tj',
    templateUrl: './update-tj.component.html',
    styleUrls: ['./update-tj.component.scss']
})
export class UpdateTjComponent implements OnInit {
    persons: Person[];
    projects: Project[];
    tjs: Tj[];

    tj: Tj = {
        tjId: null,
        tarif: null,
        personId: null,
        projectId: null,
    }

    project: Project = {
        projectId: null,
        projectName: '',
        clientId: null,
        managerId:null
    }

    person: Person = {
        personId: null,
        firstName: '',
        lastName: '',
        managerId: null
    }

    personId;
    projectId;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private personService: PersonService, public dialog: MatDialog,
                private projectService: ProjectService, private tjService: TjService, private router: Router) {
    }

    ngOnInit() {
        this.getAllPersons();
        this.getAllProject();
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

    updateTj(dataTj: Tj) {
        dataTj.projectId = this.data.projectId
        dataTj.personId = this.data.personId
        this.tjService.updateTj(dataTj);
        this.dialog.closeAll();
        this.router.navigateByUrl('/tjs');
    }
}
