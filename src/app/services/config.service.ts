import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';
import {ConfigTime} from '../entities/ConfigTime';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private subject = new BehaviorSubject<ConfigTime>(null);

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

    constructor() {
        this.subject.next(new ConfigTime(this.months[new Date().getMonth()], new Date().getFullYear()));
    }

    sendMessage(config: ConfigTime): void {
        const configTime = this.subject.getValue();
        if (configTime) {
            config.listPublicDay.splice(0);
            if (config.year == null && configTime.year != null) {
                config.year = configTime.year;
            } else if (config.month == null && configTime.month != null) {
                config.month = configTime.month;
            }
            if (config.year && config.month) {
                this.subject.next(config);
                }
        } else {
            this.subject.next(config);
        }
    }

    getMessage(): Observable<ConfigTime> {
        return this.subject;
    }
}
