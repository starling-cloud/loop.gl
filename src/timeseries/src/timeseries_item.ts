
export class TimeSeriesItem {

    constructor(
        timestamp: any,
        value: number = undefined
    )
    {
        var t = timestamp;
        this.value = value;

        if (typeof t == "object") {
            if (TimeSeries.getClassName(t) != "Date") {
                t = timestamp.timestamp;
                this.value = timestamp.value;
            }
        }

        if (typeof t == "string")
            if (/\d{4}-[01]\d-[0-3]\d(?:T[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))?/.test(t))
                t = new Date(t);

        this.timestamp = t;
    }

    timestamp: Date;
    value: number;

    get clone(): TimeSeriesItem {
        return new TimeSeriesItem(this.timestamp, this.value);
    }
}