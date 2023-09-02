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


/**
 * Class representing a timezone.
 */
 class TimeZone {

    private timeZone: string;

    /**
     * Create a timezone.
     * @param timeZone - A string representing the timezone, 
     * such as 'UTC', 'PST', 'EST', 'Asia/Kolkata' or 'Europe/London'.
     */
    constructor(timeZone: string) {
        this.timeZone = timeZone;
    }

    /**
     * Get the current timezone.
     * @return A string representing the current timezone.
     */
    public getTimeZone(): string {
        return this.timeZone;
    }

    /**
     * Set a new timezone.
     * @param timeZone - A string representing the new timezone.
     */
    public setTimeZone(timeZone: string): void {
        this.timeZone = timeZone;
    }

    /**
     * Get the current date and time in this timezone.
     * @return A Date object representing the current date and time in this timezone.
     */
    public getCurrentDateTime(): Date {
        return new Date(new Date().toLocaleString("en-US", {timeZone: this.timeZone}));
    }

    /**
     * Convert a Date object from the local timezone to this timezone.
     * @param date - A Date object representing a date and time in the local timezone.
     * @return A Date object representing the same moment in time in this timezone.
     */
    public convertFromLocal(date: Date): Date {
        const localTime = date.getTime();
        const localOffset = date.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        const offset = new Date(utc).toLocaleString("en-US", {timeZone: this.timeZone}).getTimezoneOffset();
        const timezoneDate = new Date(utc + (60000 * offset));
        return timezoneDate;
    }

}
