import { useMemo, useState } from 'react';
import {
    Area,
    AreaChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import styles from './styles.module.css';
import { IoClose } from 'react-icons/io5';
import { useTrackerStore } from '../../../hooks/useTrackerStor';
import { dayjs } from '../../../../utils/dayjs';
import { cn } from '../../../../utils/cn';

type ViewMode = 'year' | 'month' | 'week';

const Analytics = () => {
    const trackerState = useTrackerStore((state) => state.tracker)
    const [viewMode, setViewMode] = useState<ViewMode>('week');
    const isAnimationActive = true;

    const chartData = useMemo(() => {
        if (viewMode === 'week') {
            const days = [
                'Sen',
                'Sel',
                'Rab',
                'Kam',
                'Jum',
                'Sab',
                'Min'
            ];

            const grouped = trackerState.reduce(
                (acc, item) => {
                    const day = dayjs(item.createdAt).format('ddd');

                    acc[day] = (acc[day] || 0) + item.counted;

                    return acc;
                },
                {} as Record<string, number>
            );

            return days.map((day) => ({
                label: day,
                total: grouped[day] || 0,
            }));
        }

        const grouped = trackerState.reduce(
            (acc, item) => {
                const label =
                    viewMode === 'year'
                        ? dayjs(item.createdAt).format('YYYY')
                        : dayjs(item.createdAt).format('MMM');

                acc[label] = (acc[label] || 0) + item.counted;

                return acc;
            },
            {} as Record<string, number>
        );

        return Object.entries(grouped).map(([label, total]) => ({
            label,
            total,
        }));
    }, [viewMode, trackerState]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button type='button' className={cn(viewMode === "week" ? styles.active : "")} onClick={() => setViewMode('week')}>Minggu</button>
                <button type='button' className={cn(viewMode === "month" ? styles.active : "")} onClick={() => setViewMode('month')}>Bulan</button>
                <button type='button' className={cn(viewMode === "year" ? styles.active : "")} onClick={() => setViewMode('year')}>Tahun</button>
            </div>

            <div className={styles.chartContainer}>
                <AreaChart
                    responsive
                    className={styles.chart}
                    data={chartData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}

                >
                    <defs>
                        <linearGradient id="counter" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--surface-container)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--surface-container)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="label" width='auto' />
                    <YAxis width="auto" />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload?.length) {
                                return (
                                    <div className={styles.tooltip}>
                                        <span className={styles.tooltipLabel}>
                                            {payload[0].payload.label} :
                                        </span>
                                        <div className={styles.tooltipValue}>
                                            {payload[0].value} <IoClose />
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                        defaultIndex={1}
                        active
                    />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="var(--strok-chart)"
                        fillOpacity={1}
                        fill="url(#counter)"
                        isAnimationActive={isAnimationActive}
                        className={styles.area}
                    />
                </AreaChart>
            </div>
        </div>
    );
};

export default Analytics;