import {createRoute} from "atomic-router"

export const routes = {
    home: createRoute(),
    createTask: createRoute(),
    editTask: createRoute<{
        id: string
    }>(),
    login: createRoute(),
}
