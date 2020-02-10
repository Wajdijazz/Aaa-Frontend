import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {Person} from '../persons/person';
import {Project} from '../projects/project';
import {InterventionService} from '../services/intervention.service';
import {Manager} from '../managers/manager';
import {TjService} from '../services/tj.service';
import {DatasetService} from '../services/dataset.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


    private projects: Project[];
    worked: any
    managers: Manager[];
    manager: Manager = {
        managerId: null,
        firstName: '',
        lastName: ''
    }
    person: Person = {
        personId: null,
        firstName: '',
        lastName: '',
        manager: null,
    }

    dataset = []
    private selectedMonth: any;
    private personList = [];
    private personListView = [];
    private datasetList = [];

    constructor(private personService: PersonService, private projectService: ProjectService,
                private interventionService: InterventionService,
                private tjService: TjService, private datasetService: DatasetService) {
    }

    ngOnInit() {
        this.getWorkedDayByPeronAndProject()
    }

    getWorkedDayByPeronAndProject() {
        this.projectService.getProjects().subscribe((dataProject: Project[]) => {
            this.projects = dataProject
            this.projects.forEach(project => {
                this.datasetService.getDatasetByProjectId(project.projectId).subscribe((data: any) => {
                    this.personList = data.persons
                    this.personList.forEach(person => {
                        let indexName = this.personListView.findIndex(p => p.firstName === person.firstName && p.lastName ===person.lastName)
                        if (indexName === -1) {
                            this.personListView.push(person)
                        }
                        this.interventionService.getWorkedByPersonAndProject(project.projectId, person.personId)
                            .subscribe((data: number) => {
                                this.worked = data / 2;
                                person.worked = this.worked
                                this.tjService.getTijByProjectAnPerson(project.projectId, person.personId)
                                    .subscribe((tarif: number) => {
                                        person.price = tarif / 1
                                    })
                            })
                    })

                    if (data.project) {
                        this.dataset.push(data)
                    }
                })
            })
        })

    }
}
