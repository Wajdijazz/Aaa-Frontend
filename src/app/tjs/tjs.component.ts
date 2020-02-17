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
import {DatasetService} from '../services/dataset.service';

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
    private personList = [];
    private personListView = [];
    private dataset = [];

    constructor(private personService: PersonService, private projectService: ProjectService,
                private tjService: TjService, public dialog: MatDialog, private datasetService: DatasetService) {
    }

    ngOnInit() {
        this.displayTable()
        this.getAllPersons();
        this.getAllProject();
    }

    getAllPersons() {
        this.personService.getPersons().subscribe((data: Person[]) => {
            this.persons = data;
        })
    }

    selectPerson(personId) {
        this.personId = personId;
        console.log(personId);
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

    displayTable() {
        this.projectService.getProjects().subscribe((dataProject: Project[]) => {
            this.projects = dataProject
            this.projects.forEach(project => {
                this.datasetService.getDatasetByProjectId(project.projectId).subscribe((data: any) => {
                    this.personList = data.persons
                    this.personList.forEach(person => {
                        person.price = 0
                        let indexName = this.personListView.findIndex(p => p.firstName === person.firstName &&
                            p.lastName === person.lastName)
                        if (indexName === -1) {
                            this.personListView.push(person)
                        }
                        this.tjService.getTijByProjectAnPerson(project.projectId, person.personId)
                            .subscribe((tarif: any) => {
                                person.price = tarif / 1
                            })
                    })
                    if (data.project) {
                        this.dataset.push(data)
                    }
                })
            })
            this.dataset = []
        })
    }

    addTj(data: Tj) {
        this.tjService.saveTj(data, this.projectId, this.personId);
        window.location.reload();
    }

    onKey(event, projectId, personId) {
        console.log('project' + projectId + 'Person' + personId)
        const tarif = event;
        this.tj.tarif = tarif
        this.tjService.saveTj(this.tj, projectId, personId)
        window.location.reload();

    }

    deleteTj(tjId) {
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
