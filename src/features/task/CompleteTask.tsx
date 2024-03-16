import {Button, Icon} from "@gravity-ui/uikit"
import { SquareCheck } from '@gravity-ui/icons'
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

taskCompleted.watch(state => {
    console.log('taskCompleted.watch', state)
})

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
}).watch(state => {
    console.log('sample', state)
})

export function CompleteTaskButton({ task }: CompleteTaskButtonProps) {
    const [event] = useUnit([ taskCompleted ])

    return (
        <Button onClick={() => {
            console.log('click')
            event(task.id)
        }} type={'button'} size={'s'} view={'flat'}>
            <Icon data={SquareCheck} />
        </Button>
    )
}
