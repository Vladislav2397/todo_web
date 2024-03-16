import {createStore} from "effector"

type Task = {
    id: string
    name: string
    description: string
    isCompleted: boolean
}

export const $tasks = createStore<Task[]>([
    //
])

export const $uncompletedTasks = $tasks.map(tasks =>
    tasks.filter(task => !task.isCompleted)
)

export const $completedTasks = $tasks.map(tasks =>
    tasks.filter(task => task.isCompleted)
)
