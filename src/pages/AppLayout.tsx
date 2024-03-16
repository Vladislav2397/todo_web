import React from "react";

import styles from './AppLayout.module.scss'

export function AppLayout({ children }: React.PropsWithChildren) {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}
