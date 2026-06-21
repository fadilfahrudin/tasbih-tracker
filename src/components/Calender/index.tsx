import { useState } from 'react';
import { dayjs } from '../../../utils/dayjs';

import MonthView from './MonthView';
import WeekView from './WeekView';

import type { CalendarProps } from '../../types/calender.type';

import styles from './styles.module.css';
import { cn } from '../../../utils/cn';

export default function Calendar({
    view = 'day',
    onChange,
}: Readonly<CalendarProps>) {
    const [currentView, setCurrentView] = useState(view);

    const selectedDate = dayjs();

    return (
        <section className={styles.calendarContainer}>
            <div className={styles.calendarHeader}>
                <button
                    className={cn(
                        styles.viewTab,
                        currentView === 'day' && styles.active
                    )}
                    onClick={() => setCurrentView('day')}
                >
                    Hari
                </button>
                <button
                    className={cn(
                        styles.viewTab,
                        currentView === 'month' && styles.active
                    )}
                    onClick={() => setCurrentView('month')}
                >
                    Bulan
                </button>
            </div>

            {currentView ===
                'day' ? (
                <WeekView
                    selectedDate={selectedDate}
                    onSelect={date => onChange(date)}
                />
            ) : (
                <MonthView
                    onChange={onChange}
                />
            )}
        </section>
    );
}