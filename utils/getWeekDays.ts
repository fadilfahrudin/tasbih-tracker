import { Dayjs } from 'dayjs';

export const getWeekDays = (
    selectedDate: Dayjs
) => {
    const startOfWeek = selectedDate
        .startOf('week')
        .add(1, 'day');

    return Array.from(
        { length: 7 },
        (_, index) =>
            startOfWeek.add(index, 'day')
    );
};