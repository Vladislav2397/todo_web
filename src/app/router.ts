import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';

import { Home } from '@/pages/Home/Home.tsx'
import { CreateTask } from '@/pages/CreateTask'

// 1. Define routes
const routes = [
    { path: '/', route: Home.route },
    { path: '/create-task', route: CreateTask.route },
];

// 2. Create router
export const router = createHistoryRouter({
    routes: routes,
});

// 3. Create history
const history = createBrowserHistory();

// 4. Attach it to router
router.setHistory(history);
