import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-calendar-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, AfterViewInit {

    @Input('color') selectedColor: string;
    @Input('project') selectedItem: Project;
    @Input('projects') projects: Map<number, Project>;
    @Input('role') role: Role;
    @ViewChild('previous') previous: ElementRef;
    @ViewChild('next') next: ElementRef;
    @ViewChild('calendarDivTop') calendarDivTop: ElementRef;
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    view: CalendarView = CalendarView.Month;
    affectedDays: TimeAccounting[] = [];
    configTime: ConfigTime;
    workedDays: number;
    lastModified: Date;
    openDays: number;
    correct = false;
    previousClick = false;
    TAmap: Map<string, TimeAccounting[]> = new Map();
    listDate: number[] = [];
    @ViewChild(CalendarMonthViewComponent) calendarMonthView: CalendarMonthViewComponent;
    @Input() user_view = 1;

    constructor(private holidays: PublicHolidayServices, private configService: ConfigService,
                private timeAccountingServices: TimeAccountingServices, private snackBar: MatSnackBar) {
        this.configService.getMessage().pipe(debounce(val => timer(500))).subscribe((configTime: ConfigTime) => {
            this.configTime = configTime;
            this.updateComponent();
        });
    }

    get getLocale(): string {
        if (localStorage.getItem('LANG') != null) {
            return localStorage.getItem('LANG');
        }
    }

    private static setColorOfMonthCase(item: Project) {
        let color;
        switch (item.name) {
            case 'Absences':
                color = '#B7ECFF';
                break;
            case 'Formation':
                color = '#BA9CC7';
                break;
            default:
                color = '#D1FFB7';
        }
        return color;
    }

    ngOnInit(): void {
        setInterval(function() {
            const self = this;
            if (self.previousClick) {
                if (self.affectedDays.length > 0) {
                    self.affectedDays[0].isEstimated = false;
                    self.lastModified = new Date();
                    localStorage.setItem('lastModified', self.lastModified.toDateString());
                    self.createTimeAccounting();
                }
            }
            self.previousClick = false;
        }.bind(this), 5000);
        const calendar = document.getElementById('mwl-calendar');
        calendar.addEventListener('click', () => {
            this.previousClick = true;
        });
    }

    hover(event: any) {
        const target = event.currentTarget.parentElement;
        if (target.classList.contains('hover')) {
            target.classList.remove('hover');
        } else {
            target.classList.add('hover');
        }
    }

    ngAfterViewInit(): void {
        this.configService.getMessage().pipe(debounce(val => timer(500))).subscribe((configTime: ConfigTime) => {
            if (configTime.year && configTime.month) {
                this.listDate = configTime.listPublicDay;
                this.refreshCalendar(configTime);
                this.timeAccountingServices.getTimeAccountingForMonthAndUser(configTime.year,
                    configTime.getMonthToNumber(), AuthUtils.getCurrentUser().id)
                    .pipe((debounce(val => timer(500)))).subscribe((timeAccountingList: TimeAccounting[]) => {
                    if (timeAccountingList != null) {
                        timeAccountingList.forEach((workedDay: TimeAccounting) => {
                            if (workedDay.lastModified > this.lastModified || this.lastModified == null) {
                                this.lastModified = workedDay.lastModified;
                            }
                            if (workedDay.pk.projectId != null) {
                                if (!this.TAmap.get(String(workedDay.pk.projectId))) {
                                    this.TAmap.set(String(workedDay.pk.projectId), [workedDay]);
                                } else {
                                    this.TAmap.get(String(workedDay.pk.projectId)).push(
                                        workedDay
                                    );
                                }
                            }
                        });
                    }
                    this.refreshCalendar(configTime);
                });
            }
        });
    }

    refreshCalendar(configTime: ConfigTime) {
        this.affectedDays = [];
        this.viewDate = new Date();
        this.viewDate.setFullYear(configTime.year, configTime.getMonthToNumber() - 1, 1);
        this.refresh.next();
    }

    wholeDayClicked(day: CalendarMonthViewDay, event: any, wholeDay = true): void {
        const listDays: any[] = event.target.nextElementSibling.children;
        const dayAlreadyCreate: string[] = [];
        let dayToCreate = ['AM', 'PM'];
        let i = 0;
        const eventAlreadyPush = day.events;
        for (const io of eventAlreadyPush) {
            dayAlreadyCreate.push(new Date(io.start).getHours() === 3 ? 'AM' : 'PM');
        }
        if (dayAlreadyCreate.length !== 2) {
            dayToCreate = dayToCreate.filter(n => !dayAlreadyCreate.includes(n));
        }
        for (const period of dayToCreate) {
            this.dayClicked(day, period, listDays[i++], wholeDay);
        }
    }

    dayClicked(day: CalendarMonthViewDay, period: string, event: any, wholeDay: boolean): void {
        const halfDay = wholeDay === true ? event : event.target;
        if (this.selectedItem != null) {
            const dateIndex = this.getEventIndex(period, day.events);
            if (dateIndex > -1) {
                if (day.events[dateIndex].meta[0].project.name === this.selectedItem.name
                    && day.events[dateIndex].meta[0].role.shortName === this.role.shortName) {
                    day.backgroundColor = 'white';
                    day.events.splice(dateIndex, 1);
                    this.workedDays += -0.5;
                    this.checkIfCorrect();
                } else {
                    day.events[dateIndex].color.primary = CalendarComponent.setColorOfMonthCase(this.selectedItem);
                    day.events[dateIndex].meta = [{
                        project: this.selectedItem,
                        role: this.role
                    }];
                }
            } else {
                day.events.push({
                    id: null,
                    title: null,
                    start: setHours(setMinutes(new Date(), 0), (period === 'AM') ? 3 : 18),
                    color: {primary: CalendarComponent.setColorOfMonthCase(this.selectedItem), secondary: 'blue'},
                    meta: [{
                        project: this.selectedItem,
                        role: this.role
                    }]
                });
                halfDay.classList.add(day.events[day.events.length - 1].color.primary);
                this.workedDays += 0.5;
                this.checkIfCorrect();
            }
        } else if (this.selectedItem === undefined) {
            this.snackBar.open('Choisissez un type d\'absence', 'Fermer', {
                duration: 1000
            });
        } else {
            this.snackBar.open('Choisissez un rôle', 'Fermer', {
                duration: 1000
            });
        }
        this.setSelectedDays(this.calendarMonthView.view.days);
    }

    beforeMonthViewRender({body}: { body: CalendarMonthViewDay[] }): void {
        body.forEach(day => {
            const dayOfMonth = day.date.getDate();
            const month = day.date.getMonth();

            if (
                this.affectedDays.some(
                    selectedDay => selectedDay[0].date.getTime() === day.date.getTime()
                )
            ) {
                day.cssClass = 'cal-day-selected';
            }
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
            this.TAmap.forEach((TAlist, key, map) => {
                const project = this.projects.get(parseInt(key, 0));
                TAlist.forEach(WK => {
                    const role = WK.pk.role;
                    WK.timeranges.forEach(TA => {
                        const date = new Date(TA.date);
                        if (date.getUTCDate() === dayOfMonth && date.getMonth() === month && day.inMonth) {
                            day.events.push({
                                id: null,
                                title: null,
                                start: setHours(setMinutes(new Date(), 0), (TA.daytime.toString() === 'AM') ? 3 : 18),
                                color: {
                                    primary: CalendarComponent.setColorOfMonthCase(project), secondary:
                                        'blue'
                                },
                                meta: [{project, role}]
                            });
                        }
                    });
                });
            });
        });
    }

    addToTimeAccounting(day: CalendarMonthViewDay, period: string): void {
        let currentWorkedDay;
        let idSelectedProject;
        const index = this.getEventIndex(period, day.events);

        if (!this.selectedItem) {
            if (day.events[index].meta[0].project.id !== undefined) {
                idSelectedProject = this.selectedItem.id;
            }
        } else {
            idSelectedProject = day.events[index].meta[0].project.id;
        }

        let indexOfWorkedDay: number;

        indexOfWorkedDay = this.affectedDays.findIndex(workedDay =>
            workedDay.pk.projectId === idSelectedProject &&
            workedDay.pk.role.shortName === day.events[index].meta[0].role.shortName);

        if (indexOfWorkedDay === -1) {
            currentWorkedDay = new TimeAccounting(new TaPk(idSelectedProject,
                AuthUtils.getCurrentUser().id,
                day.date.getMonth(),
                day.date.getFullYear(),
                day.events[index].meta[0].role),
                false,
            );
        } else {
            currentWorkedDay = this.affectedDays.splice(indexOfWorkedDay, 1)[0];
        }
        currentWorkedDay.addDay(new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getUTCDate() + 1, 12), period);
        if (currentWorkedDay.timeranges.length > 0) {
            this.affectedDays.push(currentWorkedDay);
        }
    }

    getColorOfCell(day: CalendarMonthViewDay, momentOfDay: string): any {
        let color = null;
        day.events.forEach(x => {
            if (!color) {
                if ((x.start.getHours() < 12 && momentOfDay === 'AM') || (x.start.getHours() > 12 && momentOfDay === 'PM')) {
                    color = {'background-color': x.color.primary};
                }
            }
        });
        return color;
    }

    getProjectName(day: CalendarMonthViewDay, momentOfTheDay: string) {
        const projectName = new Map();

        day.events.forEach(x => {
            if ((x.start.getHours() > 12 && momentOfTheDay === 'PM') || (x.start.getHours() < 12 && momentOfTheDay === 'AM')) {
                if (x.meta[0].project) {
                    switch (x.meta[0].project.name) {
                        case 'Formation':
                            projectName.set('name', 'formation');
                            break;
                        case 'Absences':
                            projectName.set('name', 'absence');
                            break;
                        default:
                            projectName.set('name', x.meta[0].project.name);
                    }
                    projectName.set('role', x.meta[0].role.shortName);
                }
            }
        });
        return projectName;
    }

    updateComponent() {
        if (this.configTime) {
            this.timeAccountingServices.getWorkedDays(this.configTime.month, this.configTime.year,
                AuthUtils.getCurrentUser().id).pipe().subscribe((tav: TimeAccountingValidator) => {
                this.workedDays = tav.filledDays;
                this.openDays = tav.businessDays;
                this.correct = this.workedDays >= this.openDays;
                return;
            });
        }
    }

    checkIfCorrect() {
        this.correct = this.workedDays >= this.openDays;
    }

    createTimeAccounting() {
        this.timeAccountingServices.createTimeAccounting(this.affectedDays, this.configTime.year, this.configTime.getMonthToNumber(),
            this.user_view, false).toPromise().catch(data => {
            this.snackBar.open('Une erreur est survenue !', 'Dismiss', {
                duration: 5000
            });
        });
    }

    private setSelectedDays(month: CalendarMonthViewDay[]) {
        this.affectedDays = [];
        month.forEach(day => {
            day.events.forEach(event => {
                if (event.meta[0].project) {
                    if (event.start.getHours() === 18) {
                        this.addToTimeAccounting(day, 'PM');
                    } else {
                        this.addToTimeAccounting(day, 'AM');
                    }
                }
            });
        });
    }

    private getEventIndex(period: string, events: any): number {
        let index: number = null;
        events.forEach(x => {
            if ((period === 'AM' && x.start.getHours() < 12) || (period === 'PM' && x.start.getHours() > 12)) {
                index = events.indexOf(x);
            }
        });
        return (index == null) ? -1 : index;
    }
}
