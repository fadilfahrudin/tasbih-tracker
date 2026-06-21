import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TrackerItem = {
    trackerId: number;
    trackerName: string;
    counted: number;
    createdAt: string;
};

type TrackerPayload = {
    trackerName: string;
    counted: number;
};

interface TrackerState {
    tracker: TrackerItem[];
    setTracker: (payload: TrackerPayload) => void;
}

export const useTrackerStore = create<TrackerState>()(
    persist(
        (set) => ({
            tracker: [],

            setTracker: (payload) =>
                set((state) => {
                    const unix = Math.floor(Date.now() / 1000);

                    const newTracker: TrackerItem = {
                        trackerId: unix,
                        trackerName: payload.trackerName,
                        counted: payload.counted,
                        createdAt: new Date().toISOString(),
                    };

                    return {
                        tracker: [...state.tracker, newTracker],
                    };
                }),
        }),
        {
            name: 'tracker-storage',
        }
    )
);