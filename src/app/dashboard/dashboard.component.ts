import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {Person} from '../entities/person';
import {Project} from '../entities/project';
import {InterventionService} from '../services/intervention.service';
import {Manager} from '../entities/manager';
import {TjService} from '../services/tj.service';
import {DatasetService} from '../services/dataset.service';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';
import {Tj} from '../tjs/tj';
import {Dashboard} from '../entities/dashboard';
import {DasboardService} from '../services/dasboard.service';
import {NavigationEnd, Router} from '@angular/router';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class DashboardComponent implements OnInit, OnDestroy {
    mySubscription: any;
    private projects: Project[];

    worked: any;
    managers: Manager[];
    manager: Manager = {
        managerId: null,
        firstName: '',
        lastName: ''
    };

    person: Person = {
        personId: null,
        firstName: '',
        lastName: '',
        managerDto: null,
        isActive: null
    };

    project: Project = {
        projectId: null,
        projectName: null,
        isActive: null,
        managerDto: null,
        clientDto: null,

    }
    tj: Tj = {
        tjId: null,
        personId: null,
        projectId: null,
        tarif: null
    };
    dashboard: Dashboard = {
        dashboardId: null,
        personId: null,
        projectId: null,
        tarif: null,
        worked_day: null,
        total: null
    }

    dataset = [];
    private personList = [];
    private personListView = [];
    private month: any;
    private year: number;
    private date: FormControl;
    private projectActive: Project[];
    private savedData=[];
    private dataSource: any;
    private persons= [] ;
    private projectsList=[];


    constructor(private personService: PersonService, private projectService: ProjectService,
                private interventionService: InterventionService,
                private tjService: TjService, private datasetService: DatasetService,
                private  dashboardService: DasboardService, private router: Router) {

        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
            }
        });
    }

    ngOnInit() {
        this.date = new FormControl(moment());
        this.displayTable(this.date.value.month() + 1, this.date.value.year());
    }

    /**
     * cette fontion permet de lister tous les projets
     */
    getAllProjects() {
        this.projectService.getProjects().subscribe((dataProject: Project[]) => {
            this.projects = dataProject;
        });
        return this.projects;
    }


    /**
     *  Cette fonction permet lister tous dataset de tableau pour chaque projet
     * et aprés on va recuperer les worked day et price pour chaque personne et projet et
     * enfin on va calculer le somme de price pour chaque projet
     * @param monthNumber
     * @param yearNumber
     */
    displayTable(monthNumber: number, yearNumber: number) : void {
      this.projectService.getProjects().subscribe((dataProject: Project[]) => {
            this.projects = dataProject;
            this.projectActive = this.projects.filter(project => project.isActive === true);
            this.projectActive.forEach(project => {
                this.datasetService.getDatasetByProjectId(project.projectId).subscribe((data: any) => {
                    if (data.project) {
                        data.project.totalByProject = 0;
                    }
                    this.personList = data.persons;
                    this.personList.forEach(person => {
                        person.price = 0;
                        person.worked = 0;
                        const indexPersonName = this.personListView.findIndex(p => p.firstName === person.firstName &&
                            p.lastName === person.lastName);
                        if (indexPersonName === -1) {
                            this.personListView.push(person);
                        }
                        this.interventionService.getWorkedByPersonAndProjectByMonthAndYear(project.projectId, person.personId
                            , monthNumber, yearNumber).subscribe((dataWorkedDay: number) => {
                            person.worked = dataWorkedDay;
                            this.tjService.getTijByProjectAnPerson(project.projectId, person.personId)
                                .subscribe((tarif: number) => {
                                    person.price = (tarif * dataWorkedDay);
                                    if (data.project) {
                                        data.project.totalByProject = data.project.totalByProject + person.price;
                                    }
                                    this.savedData.push(project.projectId,person.personId,person.price,person.worked);

                                })
                        })
                    });
                    if (data.project) {
                        this.dataset.push(data);
                    }
                })
            })
        });
        this.dataset = []
    };

    /**
     * Cette fonction permet de selectionner mois et année et faire l'appel à la fonction display Table
     * @param normalizedMonth
     * @param normalizedYear
     * @param datepicker
     */
    chosenMonthAndYear(normalizedMonth: Moment, normalizedYear: Moment, datepicker: MatDatepicker<Moment>) : void {
        this.date = new FormControl(normalizedMonth);
        this.year = normalizedYear.year();
        this.month = normalizedMonth.month() + 1;
        this.displayTable(this.month, this.year);
        datepicker.close();
    }

    /**
     * Cette methode permet de masquer un projet de tableau
     * @param projectId
     */
    disableProject(projectId: any) : void {
        this.project.isActive = false;
        this.projectService.updateisActivePeroject(projectId, this.project);
        this.router.navigateByUrl('/dashboard');
    }

    /**
     * Cette methode permet de masquer une personne de tableau
     * @param personId
     */
    disablePerson(personId: number) : void {
        this.person.isActive = false;
        this.personService.updateisActivePerson(personId, this.person);
        this.router.navigateByUrl('/dashboard');
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

}
