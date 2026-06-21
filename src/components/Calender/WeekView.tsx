import { Dayjs } from 'dayjs';
import { dayjs } from '../../../utils/dayjs';
import { cn } from '../../../utils/cn';
import styles from './styles.module.css';
import { useState } from 'react';

interface Props {
    selectedDate: Dayjs;
    onSelect: (date: Dayjs) => void;
}

export default function WeekView({
    selectedDate,
    onSelect,
}: Readonly<Props>) {
    const [selectedDay, setSelectedDay] = useState(selectedDate);
    const startOfWeek = selectedDate
        .startOf('week')
        .add(0, 'day');

    const days = Array.from(
        { length: 7 },
        (_, i) =>
            startOfWeek.add(i, 'day')
    );

    return (
        <div className={styles.weekContainer}>
            <div className={styles.weekHeader}>
                {days.map(date => (
                    <span key={date.format()}>{date.format('ddd')}</span>
                ))}
            </div>

            <div className={styles.weekDays}>
                {days.map(date => {
                    const disabled =
                        date.isAfter(
                            dayjs(),
                            'day'
                        );

                    return (
                        <button
                            key={date.format()}
                            disabled={disabled}
                            onClick={() => {
                                onSelect(date);
                                setSelectedDay(date);
                            }}
                            className={cn(
                                styles.day,
                                date.isSame(selectedDay, 'day') && styles.selected,
                                date.isSame(dayjs(), 'day') && styles.today
                            )}
                        >
                            {date.date()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}