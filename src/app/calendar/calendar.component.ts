import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {CalendarMonthViewDay, CalendarView} from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    view: CalendarView = CalendarView.Month;


    listDate: number[] = [];

    constructor() { }

    ngOnInit() {
    }

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
