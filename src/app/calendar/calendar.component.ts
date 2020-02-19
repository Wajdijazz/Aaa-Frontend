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

    listDate: number[] = [];

    constructor(private configService: ConfigService) { }

    ngOnInit() {
        this.configTime.setActualDate();
        // this.updateDate();
    }

    // ngAfterViewInit(): void {
    //     this.configService.getMessage().pipe(debounce(val => timer(500))).subscribe((configTime: ConfigTime) => {
    //         if (configTime.year && configTime.month) {
    //             this.refreshCalendar(configTime);
    //             }
    //     });
    // }

    refreshCalendar(configTime: ConfigTime) {
        console.log('Refresh calendar..');
        this.viewDate = new Date();
        this.viewDate.setFullYear(configTime.year, configTime.getMonthToNumber() - 1, 1);
        this.refresh.next();
        console.log('View date :' + this.viewDate);
        console.log('refresh :' + this.refresh);
    }

    refreshCalendar2(configTime: ConfigTime) {
        console.log('Refresh calendar..');
        this.viewDate = new Date();
        this.viewDate.setFullYear(configTime.year, configTime.getMonthToNumber() + 1, 1);
        this.refresh.next();
        console.log('View date :' + this.viewDate);
        console.log('refresh :' + this.refresh);
    }

    // updateDate() {
    //     const currentTime = new ConfigTime(this.months[this.viewDate.getMonth()], this.viewDate.getFullYear());
    //     this.configService.sendMessage(currentTime);
    // }

    beforeMonthViewRender({body}: { body: CalendarMonthViewDay[] }): void {
        body.forEach(day => {
            const dayOfMonth = day.date.getDate();
            const month = day.date.getMonth();

            if (day.isWeekend) {
                day.cssClass = 'week-end';
            }

            const dayOff: boolean = this.listDate.filter((tmp) => tmp === dayOfMonth)[0] != null;

            if (dayOff) {
                day.cssClass = 'week-end';
            }
            if (!day.inMonth) {
                day.cssClass = 'disabled';
            }
            // this.TAmap.forEach(TAlist => {
            //     TAlist.forEach( TA => {
            //         TA.timeranges.forEach(timerange => {
            //             const date = new Date(timerange.date);
            //             if (date.getUTCDate() === dayOfMonth && date.getMonth() === month && day.inMonth) {
            //                 day.events.push({
            //                     id: null,
            //                     title: null,
            //                     start: setHours(setMinutes(new Date(), 0), (timerange.daytime === 'AM') ? 3 : 18),
            //                     color: {primary: this.setColorOfMonthCase(TA.dayObject), secondary: 'blue'},
            //                     meta: [{item: TA.dayObject, role: TA.role}]
            //                 });
            //             }
            //         });
            //     });
            // });
        });
    }

}
