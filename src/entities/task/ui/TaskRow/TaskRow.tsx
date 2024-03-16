import {Card, Text} from "@gravity-ui/uikit";
import React from "react";
import styles from './TaskRow.module.scss'

export type TaskRowProps = {
    className?: string
    task: {
        id: number
        name: string
        description: string
    }
}

export function TaskRow({ task, className, children }: React.PropsWithChildren<TaskRowProps>) {
    return (
        <Card size={'m'} view={'raised'} className={[className, styles.root].join(' ')}>
            <div className={styles.content}>
                <Text className={styles.title} variant={'subheader-1'} as={"h4"}>{task.name}</Text>
                <div className={styles.actions}>
                    {children}
                </div>
            </div>
        </Card>
    )
}