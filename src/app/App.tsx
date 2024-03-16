import {createRoutesView, RouterProvider} from 'atomic-router-react'

import { router } from '@/app/router'

import {Home} from "@/pages/Home/Home.tsx"
import {CreateTask} from "@/pages/CreateTask"
import {AppLayout} from "@/pages/AppLayout.tsx";

const RoutesView = createRoutesView({
    routes: [
        { route: Home.route, view: Home.Page, layout: AppLayout },
        { route: CreateTask.route, view: CreateTask.Page, layout: AppLayout },
    ],
    otherwise: () => <div>Otherwise AppRoutesView</div>
})

function App() {
  return (
    <>
        <RouterProvider router={router}>
            <RoutesView />
        </RouterProvider>
    </>
  )
}

export default App
