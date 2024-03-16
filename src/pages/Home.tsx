import {Button, Text} from "@gravity-ui/uikit";
import {TaskRow} from "@/entities/task";
import styles from './Home.module.scss'
import {CompleteTaskButton} from "@/features/task/CompleteTask.tsx";
import {routes} from "@/shared/lib/routes.ts";
import {useUnit} from "effector-react";
import {useMedia} from "react-use";
import {taskModel} from "@/entities/task";

taskModel.$uncompletedTasks.watch(state => {
    console.log('state', state)
})

export const route = routes.home

export function HomePage() {
    const [ tasks ] = useUnit([taskModel.$uncompletedTasks])

    return (
        <>
            <HomePageHeader />
            <div className={styles.list}>
                {tasks.map(task => (
                    <TaskRow className={styles.item} key={task.id} task={task}>
                        <CompleteTaskButton task={task} />
                    </TaskRow>
                ))}
            </div>
            <HomePageFooter />
        </>
    )
}

function HomePageHeader() {
    const isNotMobile = useMedia('(min-width: 650px)')

    return (
        <div className={styles.header}>
            <Text className={styles.title} variant={'display-3'} as={'h1'}>GLR ToDo</Text>
            {isNotMobile ? <ToCreateTaskButton /> : null}
        </div>
    )
}

function HomePageFooter() {
    const isNotMobile = useMedia('(min-width: 650px)')

    if (isNotMobile) return null

    return (
        <div className={styles.footer}>
            <ToCreateTaskButton className={styles.button} />
        </div>
    )
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
