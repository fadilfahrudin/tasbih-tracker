import { create } from 'zustand';

type ScreenType = 'main' | 'profile';

interface ScreenState {
    screen: ScreenType | null;
    setScreen: (screen: ScreenType) => void;
}

export const useScreenStore = create<ScreenState>()((set) => ({
    screen: "main",
    setScreen: (screen) => set({ screen }),
}));