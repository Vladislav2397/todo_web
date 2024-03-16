import {createEffect, createEvent, createStore, sample} from "effector"

import {taskModel} from "@/entities/task"

import {taskApi} from "@/shared/api/tasks"

import {createGateHook} from "@/packages/effector-helpers"

type Mode = 'completed' | 'uncompleted'

const [HomeGate, useHomeGate] = createGateHook()

const fetchTasksFx = createEffect(taskApi.getList)

export const showModeUpdated = createEvent<Mode>()

export const $showMode = createStore<Mode>('uncompleted')
    .on(showModeUpdated, (_, mode) => mode)

sample({
    clock: HomeGate.open,
    target: fetchTasksFx,
})
sample({
    clock: fetchTasksFx.doneData,
    fn: ({ list }) => list,
    target: taskModel.$tasks,
})

export {
    useHomeGate
}
