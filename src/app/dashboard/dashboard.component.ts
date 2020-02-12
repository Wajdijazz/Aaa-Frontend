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
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';

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
    private personList = [];
    private personListView = [];
    private month: any;
    private year: number;
    private date: FormControl;

    constructor(private personService: PersonService, private projectService: ProjectService,
                private interventionService: InterventionService,
                private tjService: TjService, private datasetService: DatasetService) {
    }

    ngOnInit() {
        this.date = new FormControl(moment());
    }

    chosenMonthHandler(normalizedMonth: Moment, normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
        this.date = new FormControl(normalizedMonth);
        this.year = normalizedYear.year()
        this.month = normalizedMonth.month() + 1
        this.projectService.getProjects().subscribe((dataProject: Project[]) => {
            this.projects = dataProject
            this.projects.forEach(project => {
                this.datasetService.getDatasetByProjectId(project.projectId).subscribe((data: any) => {
                    this.personList = data.persons
                    this.personList.forEach(person => {
                        let indexName = this.personListView.findIndex(p => p.firstName === person.firstName &&
                            p.lastName === person.lastName)
                        if (indexName === -1) {
                            this.personListView.push(person)
                        }
                        this.interventionService.getWorkedByPersonAndProjectByMonth(project.projectId, person.personId, this.month, this.year)
                            .subscribe((data: number) => {
                                this.worked = data;
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
        this.dataset = []
        datepicker.close();
    }

}
