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
 * Class representing a duration in ISO 8601 format.
 * @property duration - A string representing the duration.
 */
 class ISODuration {
  private duration: string;

  /**
   * Create a duration.
   * @param duration - A string representing the duration in ISO 8601 format.
   * For example, 'P1D' represents a period of one day.
   */
  constructor(duration: string) {
      this.duration = duration;
  }

  /**
   * Get the current duration.
   * @return A string representing the current duration.
   */
  public getDuration(): string {
      return this.duration;
  }

  /**
   * Set a new duration.
   * @param duration - A string representing the new duration in ISO 8601 format.
   */
  public setDuration(duration: string): void {
      this.duration = duration;
  }

  /**
   * Add a specific number of days to the duration.
   * @param days - The number of days to add.
   */
  public addDays(days: number): void {
      this.updateDuration(days, 'D');
  }

  /**
   * Subtract a specific number of days from the duration.
   * @param days - The number of days to subtract.
   */
  public subtractDays(days: number): void {
      this.updateDuration(-days, 'D');
  }

  /**
   * Add a specific number of weeks to the duration.
   * @param weeks - The number of weeks to add.
   */
  public addWeeks(weeks: number): void {
      this.updateDuration(weeks, 'W');
  }

  /**
   * Subtract a specific number of weeks from the duration.
   * @param weeks - The number of weeks to subtract.
   */
  public subtractWeeks(weeks: number): void {
      this.updateDuration(-weeks, 'W');
  }

  /**
   * Add a specific number of months to the duration.
   * @param months - The number of months to add.
   */
  public addMonths(months: number): void {
      this.updateDuration(months, 'M');
  }

  /**
   * Subtract a specific number of months from the duration.
   * @param months - The number of months to subtract.
   */
  public subtractMonths(months: number): void {
      this.updateDuration(-months, 'M');
  }

  /**
   * Update the duration by adding or subtracting a number of a specific unit.
   * @param value - The number of units to add (if positive) or subtract (if negative).
   * @param unit - The unit of time to update, such as 'D' for days, 'W' for weeks, 'M' for months.
   * @private
   */
  private updateDuration(value: number, unit: string): void {
      const regex = new RegExp(`(\\d+)${unit}`);
      const match = this.duration.match(regex);

      if (match) {
          // If the unit already exists in the duration, update it.
          const currentValue = parseInt(match[1]);
          const newValue = currentValue + value;
          this.duration = this.duration.replace(regex, `${newValue}${unit}`);
      } else {
          // If the unit does not exist in the duration, add it.
          this.duration += `${Math.abs(value)}${unit}`;
      }
  }
}
