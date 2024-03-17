import {Button, Text, TextArea, TextInput} from "@gravity-ui/uikit"
import {useMedia} from "react-use"
import {useUnit} from "effector-react"
import {sample} from "effector"

import {
    $description,
    $title,
    editTaskButtonClicked,
    editTaskCancelled,
    descriptionUpdated,
    taskUpdated,
    titleUpdated, useEditTaskGate
} from "@/features/task/edit-task"

import {routes} from "@/shared/lib/routes"

import styles from './EditTask.module.scss'

sample({
    clock: taskUpdated,
    target: routes.home.open,
})
sample({
    clock: editTaskCancelled,
    target: routes.home.open,
})

export const route = routes.editTask

export function EditTaskPage() {
    const params = useUnit(route.$params)
    useEditTaskGate(params)

    const [ title, description, updateTitle, updateDescription ] = useUnit([$title, $description, titleUpdated, descriptionUpdated])

    return (
        <>
            <EditTaskPageHeader/>
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
                    minRows={10}
                    value={description}
                    placeholder={"Description"}
                    onUpdate={updateDescription}
                />
            </div>
            <EditTaskPageFooter />
        </>
    )
}

export function EditTaskPageHeader() {
    const isNotMobile = useMedia('(min-width: 650px)')

    return (
        <div className={styles.header}>
            <Text className={styles.title} variant={'display-3'} as={'h1'}>Edit Task</Text>
            {isNotMobile && (
                <>
                    <CancelTaskButton className={styles.headerButton} />
                    <EditTaskButton className={styles.headerButton} />
                </>
            )}
        </div>
    )
}

function EditTaskPageFooter() {
    const isNotMobile = useMedia('(min-width: 650px)')

    if (isNotMobile) return null

    return (
        <div className={styles.footer}>
            <CancelTaskButton className={styles.button} />
            <EditTaskButton className={styles.button} />
        </div>
    )
}

function CancelTaskButton({ className }: { className?: string }) {
    const [cancel] = useUnit([editTaskCancelled])

    return <Button className={className} size={'l'} onClick={cancel}>Cancel</Button>
}

function EditTaskButton({ className }: { className?: string }) {
    const [editTask] = useUnit([editTaskButtonClicked])

    return <Button className={className} size={'l'} view={'action'} onClick={editTask}>Update</Button>
}

export const EditTask = {
    route,
    Page: EditTaskPage,
}
