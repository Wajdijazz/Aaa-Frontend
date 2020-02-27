import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {CalendarView} from 'angular-calendar';
import {ConfigTime} from '../entities/ConfigTime';
import {Intervention} from '../entities/intervention';
import {InterventionService} from '../services/intervention.service';


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
    selectionChanged: EventEmitter<Array<Intervention>> = new EventEmitter();
    selectedDayOfIntervention: Array<Intervention> = [];

    interventions: Map<String, Array<Intervention>> = new Map<String, Array<Intervention>>();

    constructor(private interventionService: InterventionService) {
    }

    ngOnInit() {
        this.configTime.setActualDate();
        this.getAllIntervention();
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
            this.selectedDayOfIntervention.some(int => {
                if (int.date === intervention.date && int.mode === intervention.mode) {
                    index = this.selectedDayOfIntervention.indexOf(int);
                    return true;
                }
                return false;
            })
        ) {
            this.selectedDayOfIntervention.splice(index, 1);
            target.classList.remove('selectedDay');
            this.selectionChanged.emit(this.selectedDayOfIntervention);
        } else {
            this.selectedDayOfIntervention.push(intervention);
            target.classList.add('selectedDay');
            this.selectionChanged.emit(this.selectedDayOfIntervention);
        }
    }

    getAllIntervention() {
        this.interventionService.getInterventionsByDay().subscribe((listOfIntervention: Map<String, Array<Intervention>>) => {
            console.log(listOfIntervention)
            this.interventions = listOfIntervention;
        });
        console.log('list interventions' + this.interventions);
    }

    getInterventionOfPeriod(day: Date, mode: string): Array<Intervention> {
        const intervention: Intervention = new Intervention();
        intervention.date = day;
        intervention.mode = mode;
        let aux: Array<Intervention> = new Array<Intervention>();
        Object.keys(this.interventions).forEach((key) => {
            if (key.substr(0, 10) == this.formatDate(day)) {
                aux = this.interventions[key];
            }
        });
        return aux;
    }

    formatDate(date): string {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

}
