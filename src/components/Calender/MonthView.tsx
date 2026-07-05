import type { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.css';
import { dayjs } from '../../../utils/dayjs';
import type { CalendarProps } from '../../types/calender.type';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const WEEK_DAYS = [
    'Sen',
    'Sel',
    'Rab',
    'Kam',
    'Jum',
    'Sab',
    'Min',
];

const MonthView = ({ onChange }: CalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const [selectedDate, setSelectedDate] = useState(dayjs());

    const today = dayjs();

    const calendarDays = useMemo(() => {
        const startOfMonth =
            currentMonth.startOf('month');

        const firstDay =
            startOfMonth.isoWeekday() - 1;

        const totalDays =
            currentMonth.daysInMonth();

        const result: (Dayjs | null)[] = [];

        for (let i = 0; i < firstDay; i++) {
            result.push(null);
        }

        for (
            let day = 1;
            day <= totalDays;
            day++
        ) {
            result.push(
                startOfMonth.date(day)
            );
        }

        while (result.length < 42) {
            result.push(null);
        }

        return result;
    }, [currentMonth]);

    const isSelected = (date: Dayjs): boolean => {
        return (
            selectedDate != null &&
            dayjs(selectedDate).isSame(
                date,
                'day'
            )
        );
    };

    const handleSelect = (date: Dayjs) => {
        if (date.isAfter(today, 'day')) {
            return;
        }

        onChange(date);
        setSelectedDate(date)
    };

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <button
                    type="button"
                    className={styles.btnMonthNavigation}
                    onClick={() => setCurrentMonth(prev => prev.subtract(1, 'month'))}
                >
                    <IoChevronBackOutline size={24} />
                </button>

                <h3>
                    {currentMonth.format(
                        'MMMM YYYY'
                    )}
                </h3>

                <button
                    type="button"
                    className={styles.btnMonthNavigation}
                    onClick={() => setCurrentMonth(prev => prev.add(1, 'month'))}
                    disabled={currentMonth.isSame(today, 'month')}
                >
                    <IoChevronForwardOutline size={24} />
                </button>
            </div>

            <div className={styles.weekdaysMonthView}>
                {WEEK_DAYS.map(date => (
                    <span key={date}>{date}</span>
                ))}
            </div>

            <div className={styles.grid}>
                {
                    calendarDays.map((date, index) => {
                        if (!date) {
                            return (
                                <div
                                    key={`empty-${index}`}
                                    className={styles.empty}
                                />
                            );
                        }

                        const disabled = date.isAfter(today, 'day');
                        const selected = isSelected(date);
                        const isToday = date.isSame(today, 'day');

                        return (
                            <button
                                key={date.format('YYYY-MM-DD')}
                                type="button"
                                disabled={disabled}
                                onClick={() => handleSelect(date)}
                                className={cn(
                                    styles.day,
                                    isToday && styles.today,
                                    selected && styles.selected,
                                    disabled && styles.disabled
                                )}
                            >
                                {date.date()}
                            </button>
                        );
                    }
                    )}
            </div>
        </div>
    );
};

export default MonthView;