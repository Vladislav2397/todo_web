import {attach, createEvent, createStore, sample} from "effector"

import {taskModel} from "@/entities/task"

import {taskApi} from "@/shared/api/tasks"

import {createGateHook} from "@/packages/effector-helpers"

const [EditTaskGate, useEditTaskGate] = createGateHook<{ id: string }>()

EditTaskGate.open.watch(state => {
    console.log('EditTaskGate.open', state)
})

export const editTaskButtonClicked = createEvent()
export const editTaskCancelled = createEvent()
export const titleUpdated = createEvent()
export const descriptionUpdated = createEvent()

export const $id = createStore('')
export const $title = createStore('').on(titleUpdated, (_, title) => title)
export const $description = createStore('').on(descriptionUpdated, (_, description) => description)

const fetchTaskFx = attach({
    source: $id,
    effect: async (id) => {
        return taskApi.get(id)
    }
})

const $isTitleError = createStore(false)

export const validateFx = attach({
    source: $title,
    effect: (title) => Boolean(title)
})

export const editTaskFx = attach({
    source: {
        id: $id,
        title: $title,
        description: $description,
    },
    effect: async ({ id, title, description }) => {
        const response = await taskApi.update({
            id,
            name: title,
            description,
        })

        if (!response) {
            throw new Error('Task not updated')
        }

        return response
    },
})

export const taskUpdated = editTaskFx.done

sample({
    clock: EditTaskGate.open,
    fn: ({ id }) => id,
    target: $id,
})
sample({
    clock: EditTaskGate.open,
    target: fetchTaskFx,
})
sample({
    clock: fetchTaskFx.doneData,
    fn: ({ name }) => name,
    target: $title,
})
sample({
    clock: fetchTaskFx.doneData,
    fn: ({ description }) => description,
    target: $description,
})

sample({
    clock: editTaskButtonClicked,
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
    target: editTaskFx,
})
sample({
    clock: editTaskFx.doneData,
    source: taskModel.$tasks,
    fn: (list, newTask) => {
        return list.map(task => {
            if (task.id !== newTask.id) return task
            return newTask
        })
    },
    target: taskModel.$tasks,
})
sample({
    clock: [taskUpdated, editTaskCancelled],
    target: [
        $title.reinit,
        $description.reinit,
        $isTitleError.reinit,
    ]
})

export {
    useEditTaskGate,
}
