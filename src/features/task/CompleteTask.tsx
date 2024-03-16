import {Button, Icon} from "@gravity-ui/uikit"
import {Square, SquareCheck} from '@gravity-ui/icons'
import {createEffect, createEvent, sample} from "effector"
import {useUnit} from "effector-react"

import {taskModel} from "@/entities/task"

import {taskApi} from "@/shared/api/tasks.ts"

export type CompleteTaskButtonProps = {
    task: {
        id: string
        name: string
    }
}

const updateTaskFx = createEffect(taskApi.update)

const taskCompleted = createEvent<string>()
sample({
    clock: taskCompleted,
    source: taskModel.$tasks,
    fn: (list, id) => {
        const task = list.find(item => item.id === id)

        if (!task) {
            throw new Error('Task not found')
        }

        return {
            ...task,
            isCompleted: true,
        }
    },
    target: updateTaskFx,
})

const taskUncompleted = createEvent<string>()
sample({
    clock: taskUncompleted,
    source: taskModel.$tasks,
    fn: (list, id) => {
        const task = list.find(item => item.id === id)

        if (!task) {
            throw new Error('Task not found')
        }

        return {
            ...task,
            isCompleted: false,
        }
    },
    target: updateTaskFx,
})

sample({
    clock: updateTaskFx.doneData,
    source: taskModel.$tasks,
    fn: (list, newTask) => {
        return list.map(item => {
            if (item.id !== newTask.id) return item

            return newTask
        })
    },
    target: taskModel.$tasks,
})

export function CompleteTaskButton({ task }: CompleteTaskButtonProps) {
    const [event] = useUnit([ taskCompleted ])

    return (
        <Button
            onClick={() => event(task.id)}
            type={'button'}
            size={'s'}
            view={'flat'}>
            <Icon data={SquareCheck} />
        </Button>
    )
}

export function UncompleteTaskButton({ task }: CompleteTaskButtonProps) {
    const [event] = useUnit([ taskUncompleted ])

    return (
        <Button
            onClick={() => event(task.id)}
            type={'button'}
            size={'s'}
            view={'flat'}>
            <Icon data={Square} />
        </Button>
    )
}
