import {Card, Text} from "@gravity-ui/uikit"
import React from "react"

import styles from './TaskRow.module.scss'

export type TaskRowProps = {
    className?: string
    task: {
        id: string
        name: string
        description: string
        isCompleted: boolean
    }
    onClick?: () => void
}

export function TaskRow({ task, className, children, onClick }: React.PropsWithChildren<TaskRowProps>) {
    return (
        <Card size={'m'} view={'filled'} type={'action'} className={[className, styles.root].join(' ')} onClick={onClick}>
            <div className={styles.content}>
                <Text
                    className={styles.title}
                    style={{ textDecoration: task.isCompleted ? 'line-through' : 'normal' }}
                    color={task.isCompleted ? 'light-secondary' : 'light-primary'}
                    variant={'subheader-1'}
                    as={"h4"}>
                    {task.name}
                </Text>
                <div className={styles.actions}>
                    {children}
                </div>
            </div>
        </Card>
    )
}
