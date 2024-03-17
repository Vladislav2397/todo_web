import {createRoute} from "atomic-router"
import {createRoutesView} from "atomic-router-react"

import {chainAuthorized} from "@/entities/session/guard"

import {Home} from "./Home"
import {CreateTask} from "./CreateTask/CreateTask"
import {AppLayout} from "./AppLayout/AppLayout"
import {EditTask} from "./EditTask/EditTask"


const route = createRoute()
const guardedRoute = chainAuthorized(route)

export const mainRoutes = [
    { path: '/main(.*)', route },
    { path: '/main', route: Home.route },
    { path: '/main/create-task', route: CreateTask.route },
    { path: '/main/tasks/:id', route: EditTask.route },
]

const RoutesView = createRoutesView({
    routes: [
        { route: Home.route, view: Home.Page },
        { route: CreateTask.route, view: CreateTask.Page },
        { route: EditTask.route, view: EditTask.Page },
    ]
})

export const MainPage = () => {
    return <AppLayout>
        <RoutesView />
    </AppLayout>
}
export const Main = {
    route,
    guardedRoute,
    Page: MainPage
}
