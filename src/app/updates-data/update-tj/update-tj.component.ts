import {Component, Inject, OnInit} from '@angular/core';
import {Person} from '../../persons/person';
import {Project} from '../../projects/project';
import {Tj} from '../../tjs/tj';
import {PersonService} from '../../services/person.service';
import {ProjectService} from '../../services/project.service';
import {TjService} from '../../services/tj.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

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

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private personService: PersonService, public dialog: MatDialog,
                private projectService: ProjectService, private tjService: TjService) {
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

    updateTj(data: Tj) {
      this.tjService.updateTj(this.data.tj.tjId,this.projectId,this.personId,data)
        this.dialog.closeAll()
        window.location.reload()
    }
}
