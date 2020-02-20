import {Component, OnInit} from '@angular/core';
import {Project} from '../entities/project';
import {Person} from '../entities/person';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {Tj} from './tj';
import {TjService} from '../services/tj.service';
import {UpdateProjectComponent} from '../updates-data/update-project/update-project.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateTjComponent} from '../updates-data/update-tj/update-tj.component';
import {DatasetService} from '../services/dataset.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-tjs',
    templateUrl: './tjs.component.html',
    styleUrls: ['./tjs.component.scss']
})
export class TjsComponent implements OnInit {
    mySubscription: any;
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
        managerId:null,
    }

    person: Person = {
        personId: null,
        firstName: '',
        lastName: '',
        managerId: null
    }

    personId;
    projectId;
    private personList = [];
    private personListView = [];
    private dataset = [];

    constructor(private personService: PersonService, private projectService: ProjectService,
                private tjService: TjService, public dialog: MatDialog, private datasetService: DatasetService, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.router.navigated = false;
            }
        });
    }

    ngOnInit() {
        this.displayTable();
        this.getAllPersons();
        this.getAllProject();
        this.ngOnDestroy();
    }

    getAllPersons() {
        this.personService.getPersons().subscribe((data: Person[]) => {
            this.persons = data;
        })
    }

    selectPerson(personId) {
        this.personId = personId;
    }

    getAllProject() {
        this.projectService.getProjects().subscribe((data: Project[]) => {
            this.projects = data;
        })
    }

    selectProject(projectId) {
        this.projectId = projectId;
    }

    displayTable() {
        this.projectService.getProjects().subscribe((dataProject: Project[]) => {
            this.projects = dataProject;
            this.projects.forEach(project => {
                this.datasetService.getDatasetByProjectId(project.projectId).subscribe((data: any) => {
                    this.personList = data.persons;
                    this.personList.forEach(person => {
                        person.price = 0;
                        let indexName = this.personListView.findIndex(p => p.firstName === person.firstName &&
                            p.lastName === person.lastName)
                        if (indexName === -1) {
                            this.personListView.push(person);
                        }
                        this.tjService.getTijByProjectAnPerson(project.projectId, person.personId)
                            .subscribe((tarif: any) => {
                                person.price = tarif / 1;
                            })
                    })
                    if (data.project) {
                        this.dataset.push(data);
                    }
                })
            })
            this.dataset = [];
        })
    }

    addTj(data: Tj) {
        data.personId = this.personId;
        data.projectId = this.projectId;
        this.tjService.saveTj(data);
        this.router.navigateByUrl('/tjs');

    }

    onKey(event, projectId, personId) {
        const tarif = event;
        this.tj.tarif = tarif;
        this.tj.projectId = projectId;
        this.tj.personId = personId;
        this.tjService.saveTj(this.tj);
        this.router.navigateByUrl('/tjs');
    }

    deleteTj(tjId) {
        this.tjService.deleteTj(tjId)
        this.router.navigateByUrl('/tjs');
    }

    updateTj(projectId: number, personId: number): void {
        let dialogRef = this.dialog.open(UpdateTjComponent, {
            width: '900px',
            data: {projectId, personId}
        });
        dialogRef.afterClosed().subscribe(result => {
        });

    }
    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }
}
