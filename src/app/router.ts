import { createHistoryRouter } from 'atomic-router'
import { createBrowserHistory } from 'history'
import {sample} from "effector"

import { Login } from "@/pages/auth/Login"
import {mainRoutes} from "@/pages/main/MainLayout.tsx"

import * as model from "./model"


// 1. Define routes
const routes = [
    { path: '/login', route: Login.route },
    ...mainRoutes,
]

// 2. Create router
export const router = createHistoryRouter({
    routes: routes,
})

sample({
    clock: model.appInitialized,
    fn: () => createBrowserHistory(),
    target: router.setHistory,
})
