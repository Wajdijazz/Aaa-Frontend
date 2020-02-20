export class ConfigTime {
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

    month: string;
    year: number;
    listPublicDay: number[];

    constructor(month: string, year: number) {
        this.month = month;
        this.year = year;
        this.listPublicDay = [];
    }

    getMonthToNumber() {
        return this.months.indexOf(this.month);
    }

    setActualDate() {
        const date: Date = new Date();
        this.month = this.months[date.getMonth()];
        this.year = date.getFullYear();
    }

    toNextMonth () {
        if (this.getMonthToNumber() == 11) {
            this.year = this.year + 1;
            this.month = this.months[0]
        } else {
            this.month = this.months[this.getMonthToNumber() + 1];
        }
    }

    toPrevMonth () {
        if (this.getMonthToNumber() == 0) {
            this.year = this.year - 1;
            this.month = this.months[11]
        } else {
            this.month = this.months[this.getMonthToNumber() - 1];
        }
    }

}
