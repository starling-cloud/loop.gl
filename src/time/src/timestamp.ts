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
 * Class representing a timestamp.
 * @property date - A JavaScript Date object representing the timestamp.
 */
 class TimeStamp {

    private date: Date;

    /**
     * Create a timestamp.
     * @param date - A JavaScript Date object representing the initial value of the timestamp.
     * @constructor
     */
    constructor(date: Date) {
        this.date = date;
    }

    /**
     * Get the current timestamp.
     * @method
     * @return A JavaScript Date object representing the current timestamp.
     */
    public getTime(): Date {
        return this.date;
    }

    /**
     * Update the current timestamp.
     * @method
     * @param newDate - A JavaScript Date object representing the new value of the timestamp.
     */
    public setTime(newDate: Date): void {
        this.date = newDate;
    }

    /**
     * Get the ISO 8601 string representation of the timestamp.
     * @method
     * @return A string representing the timestamp in ISO 8601 format: "YYYY-MM-DDTHH:mm:ss.sssZ".
     */
    public toISOString(): string {
        return this.date.toISOString();
    }

    /**
     * Add a specific number of days to the timestamp.
     * @method
     * @param days - The number of days to add.
     */
    public addDays(days: number): void {
        this.date.setDate(this.date.getDate() + days);
    }

    /**
     * Subtract a specific number of days from the timestamp.
     * @param days - The number of days to subtract.
     * @method
     */
    public subtractDays(days: number): void {
        this.date.setDate(this.date.getDate() - days);
    }

    /**
     * Compare this timestamp with another one.
     * @param other - Another TimeStamp object to compare with.
     * @return A positive number if this timestamp is later than the other one,
     * a negative number if it's earlier, or 0 if they're the same.
     * @method
     */
    public compare(other: TimeStamp): number {
        return this.date.getTime() - other.getTime().getTime();
    }
}
