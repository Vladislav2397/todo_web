import {attach, createEvent, createStore, sample} from "effector"

import {taskModel} from "@/entities/task"

import {taskApi} from "@/shared/api/tasks.ts"

export const createTaskButtonClicked = createEvent()
export const createTaskCancelled = createEvent()
export const titleUpdated = createEvent()
export const descriptionUpdated = createEvent()

export const $title = createStore('').on(titleUpdated, (_, title) => title)
export const $description = createStore('').on(descriptionUpdated, (_, description) => description)

const $isTitleError = createStore(false)

export const validateFx = attach({
    source: $title,
    effect: (title) => {
        if (!title) return false

        return true
    }
})

export const createTaskFx = attach({
    source: {
        title: $title,
        description: $description,
    },
    effect: async ({ title, description }) => {
        const response = await taskApi.create({
            name: title,
            description,
        })

        if (!response) {
            throw new Error('Task not created')
        }

        return {
            id: response.id,
            name: title,
            description,
            isCompleted: false,
        }
    },
})

export const taskCreated = createTaskFx.done

sample({
    clock: createTaskButtonClicked,
    target: validateFx,
})
sample({
    clock: validateFx.doneData,
    fn: (isValid) => !isValid,
    target: $isTitleError,
})
sample({
    clock: validateFx.doneData,
    source: { title: $title, description: $description },
    filter: $isTitleError.map(state => !state),
    target: createTaskFx,
})
sample({
    clock: createTaskFx.doneData,
    source: taskModel.$tasks,
    fn: (list, newTask) => {
        return [...list, newTask]
    },
    target: taskModel.$tasks,
})
sample({
    clock: [taskCreated, createTaskCancelled],
    target: [
        $title.reinit,
        $description.reinit,
        $isTitleError.reinit,
    ]
})
