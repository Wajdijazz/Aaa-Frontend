import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {CalendarMonthViewDay, CalendarView} from 'angular-calendar';
import {ConfigTime} from '../entities/ConfigTime';
import {Intervention} from '../entities/intervention';
import {Person} from '../entities/person';
import {Project} from '../entities/project';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {InterventionService} from '../services/intervention.service';
import {InterventionsComponent} from '../interventions/interventions.component';



@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    private months =
        ['JANUARY',
            'FEBRUARY',
            'MARCH',
            'APRIL',
            'MAY',
            'JUNE',
            'JULY',
            'AUGUST',
            'SEPTEMBER',
            'OCTOBER',
            'NOVEMBER',
            'DECEMBER'];

    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    view: CalendarView = CalendarView.Month;
    configTime: ConfigTime = new ConfigTime(this.months[new Date().getMonth()], new Date().getFullYear());

    @Output()
    interventionChanged: EventEmitter<Array<Intervention>> = new EventEmitter();

    interventions: Array<Intervention> = [];
    persons: Array<Person> = [];
    projects: Array<Project> = [];

    constructor(private personService: PersonService,
                private projectService: ProjectService,
                private interventionService: InterventionService) {
    }

    ngOnInit() {
        this.configTime.setActualDate();
        this.getAllPersons();
        this.getAllProject();
        console.log('init');
    }

    refreshCalendar(configTime: ConfigTime, sign: string) {
        this.viewDate = new Date();
        switch (sign) {
            case '=' :
                this.configTime.setActualDate();
                break;
            case '+' :
                this.viewDate.setFullYear(configTime.year, configTime.getMonthToNumber() + 1, 1);
                this.configTime.toNextMonth();
                break;
            case '-' :
                this.viewDate.setFullYear(configTime.year, configTime.getMonthToNumber() - 1, 1);
                this.configTime.toPrevMonth();
                break;
        }
    }

    hover(event: any) {
        const target = event.currentTarget.parentElement;
        if (target.classList.contains('hover')) {
            target.classList.remove('hover');
        } else {
            target.classList.add('hover');
        }
    }

    selectDay(day: Date, mode: string, event: any): void {
        const intervention: Intervention = new Intervention();
        intervention.date = day;
        intervention.mode = mode;
        const target = event.currentTarget.parentElement;
        let index = 0;

        if (
                this.interventions.some(int => {
                if (int.date === intervention.date && int.mode === intervention.mode) {
                     index = this.interventions.indexOf(int);
                     return true;
                }
                return false;
                })
            ) {
            this.interventions.splice(index, 1);
            target.classList.remove('selectedDay');
        } else {
            this.interventions.push(intervention);
            target.classList.add('selectedDay');
            this.interventionChanged.emit(this.interventions);
        }
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

    wholeDayClicked(day: CalendarMonthViewDay, event: any, wholeDay = true): void {

    }

    dayClicked(day: CalendarMonthViewDay, period: string, event: any): void {

    }


}
