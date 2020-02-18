import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {CalendarView} from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    view: CalendarView = CalendarView.Month;


    constructor() { }

    ngOnInit() {
    }

}
