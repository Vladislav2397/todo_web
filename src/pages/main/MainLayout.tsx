import {createRoute} from "atomic-router"
import {createRoutesView} from "atomic-router-react"

import {Home} from "@/pages/Home"
import {CreateTask} from "@/pages/CreateTask"
import {AppLayout} from "@/pages/AppLayout.tsx"

import {chainAuthorized} from "@/entities/session/guard"

const route = createRoute()
const guardedRoute = chainAuthorized(route)

export const mainRoutes = [
    { path: '/main(.*)', route },
    { path: '/main', route: Home.route },
    { path: '/main/tasks/create', route: CreateTask.route },
]

const RoutesView = createRoutesView({
    routes: [
        { route: Home.route, view: Home.Page },
        { route: CreateTask.route, view: CreateTask.Page }
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
