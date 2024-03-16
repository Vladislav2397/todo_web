import {routes} from "@/shared/lib/routes.ts";
import styles from './CreateTask.module.scss'
import {Button, Text, TextArea, TextInput} from "@gravity-ui/uikit";
import {useMedia} from "react-use";
import {useUnit} from "effector-react";
import {
    $description,
    $title,
    createTaskButtonClicked,
    createTaskCancelled,
    descriptionUpdated,
    taskCreated,
    titleUpdated
} from "@/features/task/create-task.ts";
import {sample} from "effector";

sample({
    clock: taskCreated,
    target: routes.home.open,
})
sample({
    clock: createTaskCancelled,
    target: routes.home.open,
})

export const route = routes.createTask;

export function CreateTaskPage() {
    const [ title, description, updateTitle, updateDescription ] = useUnit([$title, $description, titleUpdated, descriptionUpdated])

    return (
        <>
            <CreateTaskPageHeader/>
            <div className={styles.content}>
                <TextInput
                    className={styles.field}
                    view={'clear'}
                    type={'text'}
                    size={'xl'}
                    value={title}
                    placeholder={"Title"}
                    onUpdate={updateTitle}
                />
                <TextArea
                    className={styles.field}
                    view={'clear'}
                    size={'s'}
                    value={description}
                    placeholder={"Description"}
                    onUpdate={updateDescription}
                />
            </div>
            <CreateTaskPageFooter />
        </>
    )
}

export function CreateTaskPageHeader() {
    const isNotMobile = useMedia('(min-width: 650px)')

    return (
        <div className={styles.header}>
            <Text className={styles.title} variant={'display-3'} as={'h1'}>Create Task</Text>
            {isNotMobile && (
                <>
                    <CancelTaskButton className={styles.headerButton} />
                    <CreateTaskButton className={styles.headerButton} />
                </>
            )}
        </div>
    )
}

function CreateTaskPageFooter() {
    const isNotMobile = useMedia('(min-width: 650px)')

    if (isNotMobile) return null

    return (
        <div className={styles.footer}>
            <CancelTaskButton className={styles.button} />
            <CreateTaskButton className={styles.button} />
        </div>
    )
}

function CancelTaskButton({ className }: { className?: string }) {
    const [cancel] = useUnit([createTaskCancelled])

    return <Button className={className} size={'l'} onClick={cancel}>Cancel</Button>
}

function CreateTaskButton({ className }: { className?: string }) {
    const [createTask] = useUnit([createTaskButtonClicked])

    return <Button className={className} size={'l'} view={'action'} onClick={createTask}>Create</Button>
}

export const CreateTask = {
    route,
    Page: CreateTaskPage,
}
