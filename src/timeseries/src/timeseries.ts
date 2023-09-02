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


// A type to represent individual data points in a time series.
type TimeSeriesData = Array<{ timestamp: Date, value: number }>;

/**
 * Class representing a time series.
 */
class TimeSeries {
    // An array of data points.
    private data: TimeSeriesData;

    /**
     * Create a time series.
     * @param initialData - The initial set of data points.
     */
    constructor(initialData: TimeSeriesData) {
        this.data = initialData;
    }

    /**
     * Add a new data point to the time series.
     * @param timestamp - The timestamp for the new data point.
     * @param value - The value for the new data point.
     */
    public addDataPoint(timestamp: Date, value: number): void {
        this.data.push({ timestamp, value });
    }

    /**
     * Get all data points in the time series.
     * @return The entire set of data points.
     */
    public getData(): TimeSeriesData {
        return this.data;
    }

    /**
     * Get a subset of data points from the time series that fall within the specified date range.
     * @param startDate - The start date of the desired date range.
     * @param endDate - The end date of the desired date range.
     * @return The subset of data points that fall within the specified date range.
     */
    public getFilteredData(startDate: Date, endDate: Date): TimeSeriesData {
        return this.data.filter((dataPoint) => {
            return (dataPoint.timestamp >= startDate && dataPoint.timestamp <= endDate);
        });
    }

    /**
     * Get the time series data aggregated using the specified aggregation function.
     * @param aggregationFunction - The function used to aggregate the data points.
     * @return The aggregated data points.
     */
    public getAggregateData(aggregationFunction: (values: number[]) => number): Array<{ timestamp: Date, value: number }> {
        // The actual aggregation logic (grouping the data points by day, hour, etc.) 
        // would need to be added here based on your specific use case. 
        // This function just provides a basic structure and uses the passed aggregation function.
        
        let aggregatedData: TimeSeriesData = [];
        
        // Assuming this.data is sorted by timestamp in ascending order
        let currentTimestamp = this.data[0].timestamp;
        let currentValues: number[] = [];
        
        for (let dataPoint of this.data) {
            if (dataPoint.timestamp === currentTimestamp) {
                currentValues.push(dataPoint.value);
            } else {
                aggregatedData.push({ timestamp: currentTimestamp, value: aggregationFunction(currentValues) });
                currentTimestamp = dataPoint.timestamp;
                currentValues = [dataPoint.value];
            }
        }
        
        // Add last aggregate data point
        if (currentValues.length > 0) {
            aggregatedData.push({ timestamp: currentTimestamp, value: aggregationFunction(currentValues) });
        }
        
        return aggregatedData;
    }
}
