// Copyright 2023 Geoid
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.




import "daycount";
import "seedrandom";

// https://www.php.net/manual/en/class.dateperiod.php
/**
 * DatePeriod Class
 * @static
 * @memberof
 * @class
 * @description 
 * @param
 * @returns
 * @example
 * @see
 */
export class DatePeriod {


}



export class DatePeriod {

    constructor(public value: number, public periodicity: number) {
    }

    private static ticksPerDay: number = 24 * 3600 * 1000;

    static calcValue(d: Date, periodicity: number): number {
        if (periodicity <= 0)
            return Number.NaN;
        d = d.date();
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        if (periodicity <= 12) {
            var m = d.monthNumber();
            var p = 12 / periodicity;
            return (m - (m % p)) / p;
        }
        var p = d.getTime() / DatePeriod.ticksPerDay;
        if (periodicity == 52) {
            p += 3;
            return (p - (p % 7)) / 7;
        }
        if (periodicity == 252) {
            if (!d.isBusinessDay())
                d = d.nextBusinessDay();
            p = d.getTime() / DatePeriod.ticksPerDay;
            return p;
        }
        if (periodicity == 365)
            return p;
        return Number.NaN;
    }

    static fromDate(d: Date, periodicity: number) {
        return new DatePeriod(DatePeriod.calcValue(d, periodicity), periodicity);
    }

    toDate(): Date {
        if (!isFinite(this.value) || (this.periodicity <= 0))
            return new Date(0);
        if (this.periodicity <= 12) {
            var p = 12 / this.periodicity;
            return Date.fromYmd(1970, p * (this.value + 1) + 1, 1).addDays(-1);
        }
        var d: Date;
        if (this.periodicity == 52) 
            d = new Date((this.value * 7 + 3) * DatePeriod.ticksPerDay);
        else
            d = new Date(this.value * DatePeriod.ticksPerDay);
        return d.date();
    }

    addPeriod(n: number): DatePeriod {
        if (this.periodicity != 252) {
            this.value += n;
        }
        else {
            var d = this.toDate();
            while (n > 0) {
                d = d.nextBusinessDay();
                n--;
            }
            while (n < 0) {
                d = d.previousBusinessDay();
                n++;
            }
            this.value = DatePeriod.calcValue(d, this.periodicity);
        }
        return this;
    }

    static range(start: Date, end: Date, periodicity: number): Date[] {
        var dp = DatePeriod.fromDate(start, periodicity);
        var dpe = DatePeriod.fromDate(end, periodicity);
        var res: Date[] = [];
        while (dp.value <= dpe.value) {
            res.push(dp.toDate());
            dp.addPeriod(1);
        }
        return res;
    }
}