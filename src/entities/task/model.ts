import {createStore} from "effector";

export const $tasks = createStore([
    {
        id: 1,
        name: 'Task 1',
        description: 'Task 1 description',
        isCompleted: false,
    },
    {
        id: 2,
        name: 'Task 2',
        description: 'Task 2 description',
        isCompleted: false,
    }
])

export const $uncompletedTasks = $tasks.map(tasks =>
    tasks.filter(task => !task.isCompleted)
)
