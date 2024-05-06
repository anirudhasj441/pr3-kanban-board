import { SerializedEditorState } from "lexical";
import { create, UseBoundStore, StoreApi } from "zustand";

type CounterState = {
    count: number;
};

type CounterAction = {
    increment: () => void;
    decrement: () => void;
};

export const counterStore = create<CounterState & CounterAction>((set) => ({
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

type EditorStateStoreState = {
    editorValue: SerializedEditorState | undefined;
};

type EditorStateStoreAction = {
    setEditorValue: (nodes: SerializedEditorState) => void;
    getEditorValue: () => SerializedEditorState | undefined;
};

export const editorStateStore: UseBoundStore<
    StoreApi<EditorStateStoreState & EditorStateStoreAction>
> = create<EditorStateStoreState & EditorStateStoreAction>()((set) => ({
    editorValue: undefined,
    setEditorValue: (editorValue) => {
        set(() => ({ editorValue: editorValue }));
    },
    getEditorValue: () => editorStateStore.getState().editorValue,
}));
