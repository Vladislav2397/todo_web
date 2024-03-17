import {createRoutesView, RouterProvider} from 'atomic-router-react'
import {useUnit} from "effector-react"
import {Link, Text} from "@gravity-ui/uikit"

import { router } from '@/app/router'

import {Login} from "@/pages/auth/Login"
import {Main} from "@/pages/main/MainLayout"

import * as model from './model'

const RoutesView = createRoutesView({
    routes: [
        { route: Login.route, view: Login.Page },
        { route: Main.guardedRoute, view: Main.Page }
    ],
    otherwise: () => <div>
        <Text variant={'display-3'} as={'h2'}>Page not found</Text>
        <Link href={'/main'}>Go To Home</Link>
    </div>
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
