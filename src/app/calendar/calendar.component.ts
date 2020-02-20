import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {CalendarMonthViewDay, CalendarView} from 'angular-calendar';
import {ConfigTime} from '../entities/ConfigTime';
import {ConfigService} from '../services/config.service';
import {debounce} from 'rxjs/operators';

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

    constructor() {

    }

    ngOnInit() {

        this.configTime.setActualDate();
        console.log('nb month' + this.configTime.getMonthToNumber());
    }

    refreshCalendar(configTime: ConfigTime) {
        console.log('Refresh calendar..');
        this.viewDate = new Date();
        this.viewDate.setFullYear(configTime.year, configTime.getMonthToNumber() - 1, 1);
        this.refresh.next();
        this.configTime.toPrevMonth();
        console.log('View date :' + this.viewDate);
        console.log('refresh :' + this.refresh);
        console.log('Config :' + this.configTime.month + '   ' + configTime.year);
    }

    refreshCalendar2(configTime: ConfigTime) {
        console.log('Refresh calendar..');
        this.viewDate = new Date();
        this.viewDate.setFullYear(configTime.year, configTime.getMonthToNumber() + 1, 1);
        this.refresh.next();
        this.configTime.toNextMonth();
        console.log('View date :' + this.viewDate);
        console.log('refresh :' + this.refresh);
        console.log('Config :' + this.configTime.month + '   ' + configTime.year);
    }

}
