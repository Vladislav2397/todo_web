import {useMedia} from "react-use"
import {useUnit} from "effector-react"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {Button, Text} from "@gravity-ui/uikit"

import {CompleteTaskButton, UncompleteTaskButton} from "@/features/task/CompleteTask.tsx"

import {TaskRow, taskModel} from "@/entities/task"

import {routes} from "@/shared/lib/routes"

import styles from './Home.module.scss'
import * as model from './model'


export const route = routes.home

export function HomePage() {
    const [showMode] = useUnit([model.$showMode])

    const [parent] = useAutoAnimate()

    return (
        <>
            <HomePageHeader />
            <div className={styles.list} ref={parent}>
                {showMode === 'completed' ? (
                    <CompletedTaskList />
                ) : (
                    <UncompletedTaskList />
                )}
            </div>
            <HomePageFooter />
        </>
    )
}

function ToggleShowModeButton({ className }: { className?: string }) {
    const [mode, updateMode] = useUnit([model.$showMode, model.showModeUpdated])

    function toggle() {
        updateMode(mode === 'completed' ? 'uncompleted' : 'completed')
    }

    return (
        <Button
            className={className}
            onClick={toggle}
            type={'button'}
            size={'l'}
            view={'normal'}
        >
            {mode === 'completed' ? 'Uncompleted' : 'Completed'}
        </Button>
    )
}

function HomePageHeader() {
    const isNotMobile = useMedia('(min-width: 650px)')

    return (
        <div className={styles.header}>
            <Text className={styles.title} variant={'display-3'} as={'h1'}>GLR ToDo</Text>
            {isNotMobile ? <>
                <ToggleShowModeButton className={styles.headerButton} />
                <ToCreateTaskButton className={styles.headerButton} />
            </> : null}
        </div>
    )
}

function HomePageFooter() {
    const isNotMobile = useMedia('(min-width: 650px)')

    if (isNotMobile) return null

    return (
        <div className={styles.footer}>
            <ToggleShowModeButton className={styles.button} />
            <ToCreateTaskButton className={styles.button} />
        </div>
    )
}

function UncompletedTaskList() {
    const [ tasks ] = useUnit([taskModel.$uncompletedTasks])

    if (!tasks.length) {
        return <div>Empty</div>
    }

    return <>
        {tasks.map(task => (
            <TaskRow className={styles.item} key={task.id} task={task}>
                <CompleteTaskButton task={task} />
            </TaskRow>
        ))}
    </>
}

function CompletedTaskList() {
    const [ tasks ] = useUnit([taskModel.$completedTasks])

    if (!tasks.length) {
        return <div>Empty</div>
    }

    return <>
        {tasks.map(task => (
            <TaskRow className={styles.item} key={task.id} task={task}>
                <UncompleteTaskButton task={task} />
            </TaskRow>
        ))}
    </>
}

function ToCreateTaskButton({ className }: { className?: string }) {
    const navigate = useUnit(routes.createTask.open)

    const toCreateTask = () => {
        navigate().then()
    }

    return <Button className={className} onClick={toCreateTask} view={'action'} size={'l'}>Create Task</Button>
}

export const Home = {
    route,
    Page: HomePage,
}
