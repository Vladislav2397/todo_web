import {createEvent, createStore} from "effector"
import {getAuth, onAuthStateChanged} from "firebase/auth"

import {app} from "@/shared/integrations/firebase"

export type Session = 'anonymous' | 'authenticated'

export const sessionUpdated = createEvent<Session>()
export const sessionInitialized = createEvent()

export const $session = createStore<Session>('anonymous').on(sessionUpdated, (_, session) => session)

export const $isSessionInitialized = createStore(false)
    .on(sessionInitialized, () => true)

$isSessionInitialized.watch(state => {
    console.log('$isSessionInitialized', state)
})

const auth = getAuth(app)

onAuthStateChanged(auth, (user) => {
    if (user) {
        sessionUpdated('authenticated')
        sessionInitialized()
    } else {
        sessionUpdated('anonymous')
        sessionInitialized()
    }
})
