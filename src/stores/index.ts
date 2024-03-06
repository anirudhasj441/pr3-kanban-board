import { create } from "zustand";

type State = {
    count: number;
};

type Action = {
    increment: () => void;
    decrement: () => void;
};

export const counterStore = create<State & Action>((set) => ({
    count: 0,
    increment: () => {
        if (counterStore.getState().count >= 10) return;
        set((state) => ({ count: state.count + 1 }));
    },
    decrement: () => {
        if (counterStore.getState().count <= 0) return;
        set((state) => ({ count: state.count - 1 }));
    },
}));
