import {createEvent, createStore} from "effector";

type Mode = 'completed' | 'uncompleted'

export const showModeUpdated = createEvent<Mode>()

export const $showMode = createStore<Mode>('uncompleted').on(showModeUpdated, (_, mode) => mode)
