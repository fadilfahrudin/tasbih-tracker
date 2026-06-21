import { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';

import { dayjs } from '../../../utils/dayjs';

import Calendar from '../Calender';
import Analytics from './Analytics';
import Card from './Card';

import { useTrackerStore } from '../../hooks/useTrackerStor';

import styles from './profile.module.css';

const Profile = () => {

    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

    const trackerState = useTrackerStore((state) => state.tracker);

    const activities = useMemo(() => {
        if (!currentDate) {
            return [];
        }

        return trackerState.filter((activity) => dayjs(activity.createdAt).isSame(
            currentDate,
            'day'
        ));
    }, [trackerState, currentDate]);

    return (
        <>
            <section className={styles.dzikirCalenderContainer}>
                <Calendar
                    onChange={(value) =>
                        setCurrentDate(
                            value as Dayjs
                        )
                    }
                />
            </section>

            <section className={styles.dzikirJournalContainer} >


                <div className={styles.dzikirJournal}>
                    <h2>Hari ini</h2>
                    {activities.map(
                        (activity) => (
                            <Card
                                key={
                                    activity.trackerId
                                }
                                counter={
                                    activity.counted
                                }
                                dzikirName={
                                    activity.trackerName
                                }
                            />
                        )
                    )}
                </div>

                <div className={styles.dzikirJournal}>
                    <h2>Grafik Perkembangan </h2>
                    <Analytics />
                </div>

            </section>
        </>
    );
};

export default Profile;