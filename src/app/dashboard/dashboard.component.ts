import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {Person} from '../persons/person';
import {Project} from '../projects/project';
import {InterventionService} from '../services/intervention.service';
import {Intervention} from '../interventions/intervention';
import {Manager} from '../managers/manager';
import {element} from 'protractor';
import {Observable} from 'rxjs';
import {DetailsComponent} from '../details/details.component';
import {MatDialog} from '@angular/material/dialog';
import {DetailsWorkComponent} from '../details-work/details-work.component';
import {TjService} from '../services/tj.service';
import {Tj} from '../tjs/tj';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    persons: Person[];
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
    private personName: string;
    private projectName: string;
    private interventions: Intervention[];
    newArr = []
    datasetClone=[]
    private result: any;
    private tjs: Tj[];
    private dataSource: Person[];
    private val1: Person | null | string | any;
    private months: string[];
    month: ''
    private selectedMonth: any;

    constructor(private personService: PersonService, private projectService: ProjectService,
                private interventionService: InterventionService, public dialog: MatDialog, private tjService: TjService) {
    }


    ngOnInit() {
        this.getAllPersons()
        this.getAllProject()
        this.getAllTjs()
        this.getWorkedDayByPeronAndProject()
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'];

    }

    selectMonth(month) {
        this.selectedMonth = month
    }

    getAllPersons() {
        this.personService.getPersons().subscribe((data: Person[]) => {
            this.persons = data;
            this.dataSource = this.persons;


        })
    }

    getAllProject() {
        this.projectService.getProjects().subscribe((data: Project[]) => {
            this.projects = data
        })
    }

    getAllTjs() {
        this.tjService.getTjs().subscribe((data: Tj[]) => {
            this.tjs = data;

        })
    }

    getWorkedDayByPeronAndProject() {
        this.dataset = [{
            person: [{name: 'Mohamed', worked: 4, price: 100}, {name: 'Wajdi', worked: 0, price: 0}, {name: 'Noe', worked: 0, price: 0}],
            project: {projectName: 'followup'}
        }
            , {
                person: [{name: 'Mohamed', worked: 0, price: 0}, {name: 'Wajdi', worked: 10, price: 120}, {
                    name: 'Noe',
                    worked: 5,
                    price: 1000
                }],
                project: {projectName: 'project 2 personnes'}
            }
        ]
    }
}
