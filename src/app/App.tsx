import {createRoutesView, RouterProvider} from 'atomic-router-react'
import {useUnit} from "effector-react"

import { router } from '@/app/router'

import {Login} from "@/pages/auth/Login"
import {Home} from "@/pages/Home"
import {CreateTask} from "@/pages/CreateTask"
import {AppLayout} from "@/pages/AppLayout"

import * as model from './model.ts'

const RoutesView = createRoutesView({
    routes: [
        { route: Login.route, view: Login.Page },
        { route: Home.guardedRoute, view: Home.Page, layout: AppLayout },
        { route: CreateTask.route, view: CreateTask.Page, layout: AppLayout },
    ],
    otherwise: () => <div>Otherwise RoutesView</div>
})

function App() {
    model.useAppGate()

    const [isInitialized] = useUnit([model.$isInitialized])

    if (!isInitialized) return null

    return (
        <>
            <RouterProvider router={router}>
                <RoutesView />
            </RouterProvider>
        </>
    )
}

export default App
