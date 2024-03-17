import {Button, Card, Text, TextInput} from "@gravity-ui/uikit"

import {signInByGoogle} from "@/features/auth/auth-by-google"

import {withUnauthorized} from "@/entities/session/guard"

import {routes} from "@/shared/lib/routes"

import styles from './Login.module.scss'

const route = routes.login

export function LoginPage() {
    return (
        <div className={styles.root}>
            <Card view={'filled'} className={styles.card}>
                <Text variant={'display-1'} as={'h2'} className={styles.title}>Authorization</Text>
                <TextInput
                    className={styles.field}
                    placeholder={'Login'}
                    size={'xl'}
                    type={'text'}
                />
                <TextInput
                    className={styles.field}
                    size={'xl'}
                    placeholder={'Password'}
                    type={'password'}
                />
                <div className={styles.actions}>
                    <Button
                        className={styles.button}
                        size={'l'}
                        onClick={signInByGoogle}>
                        By Google
                    </Button>
                    <Button
                        className={styles.button}
                        view={'action'}
                        size={'l'}>
                        Login
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export const Login = {
    route,
    guardedRoute: withUnauthorized(route, { otherwise: routes.home }),
    Page: LoginPage,
}
