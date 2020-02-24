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

    ngOnInit() {
        this.configTime.setActualDate();
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

}
