// types.ts

import { Dayjs } from 'dayjs';

export interface DateRange {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
}

export type CalendarMode =
    | 'single'
    | 'range';

export type CalendarView =
    | 'day'
    | 'month';

export interface CalendarProps {
    mode?: CalendarMode;
    view?: CalendarView;

    value?: Dayjs | DateRange;

    onChange: (
        value: Dayjs | DateRange
    ) => void;
}