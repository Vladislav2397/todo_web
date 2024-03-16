import {Button, Icon} from "@gravity-ui/uikit"
import {Square, SquareCheck} from '@gravity-ui/icons'
import {createEvent, sample} from "effector"
import {useUnit} from "effector-react"

import {taskModel} from "@/entities/task"

export type CompleteTaskButtonProps = {
    task: {
        id: number
        name: string
    }
}

const taskCompleted = createEvent<number>()
sample({
    clock: taskCompleted,
    source: taskModel.$tasks,
    fn: (list, id) => {
        return list.map(item => {
            if (item.id !== id) return item

            return {
                ...item,
                isCompleted: true,
            }
        })
    },
    target: taskModel.$tasks,
})

const taskUncompleted = createEvent<number>()
sample({
    clock: taskUncompleted,
    source: taskModel.$tasks,
    fn: (list, id) => {
        return list.map(item => {
            if (item.id !== id) return item

            return {
                ...item,
                isCompleted: false,
            }
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
