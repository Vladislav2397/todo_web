import { createHistoryRouter } from 'atomic-router'
import { createBrowserHistory } from 'history'
import {sample} from "effector"

import { Home } from '@/pages/Home/Home'
import { CreateTask } from '@/pages/CreateTask'
import { Login } from "@/pages/auth/Login"

import * as model from "./model"


// 1. Define routes
const routes = [
    { path: '/', route: Home.route },
    { path: '/create-task', route: CreateTask.route },
    { path: '/login', route: Login.route },
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
