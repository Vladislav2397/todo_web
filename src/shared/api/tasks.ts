import {
    addQuery,
    getByIdQuery,
    getQuery,
    updateQuery
} from "@/shared/api/request"

type TaskApi = {
    id: string
    name: string
    description: string
    isCompleted: boolean
}

export const getTasks = async () => {
    const query = await getQuery('tasks')

    const list: TaskApi[] = []

    query.forEach(doc => {
        list.push({
            id: doc.id,
            ...doc.data(),
        } as TaskApi)
    })

    return {
        list,
    }
}

export const getTaskById = async (id: string) => {
    const ref = await getByIdQuery('tasks', id)

    return {
        id: ref.id,
        ...ref.data() as {
            name: string
            description: string
        },
    }
}

export const createTask = async ({ name, description }: Record<string, string>) => {
    const query = await addQuery('tasks', {
        name,
        description,
        isCompleted: false,
    })

    return {
        id: query.id,
    }
}

export const updateTask = async (newTask: any) => {
    return await updateQuery('tasks', newTask)
}

export const taskApi = {
    getList: getTasks,
    get: getTaskById,
    create: createTask,
    update: updateTask,
}
