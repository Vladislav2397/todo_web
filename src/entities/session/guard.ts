import {createEvent, sample} from "effector"
import {
    chainRoute,
    RouteInstance,
    RouteParamsAndQuery
} from "atomic-router"

import { $session } from './model'

/**
 * @deprecated
 */
export const withAuthorized = <Params extends object>(route: RouteInstance<Params>, config?: { otherwise: RouteInstance<object>}) => {
    const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
    const sessionEstablished = createEvent()
    const sessionCheckFailed = createEvent()

    sample({
        clock: sessionCheckStarted,
        filter: $session.map(session => session === 'authenticated'),
        target: sessionEstablished,
    })
    sample({
        clock: sessionCheckStarted,
        filter: $session.map(session => session === 'anonymous'),
        target: sessionCheckFailed,
    })

    if (config?.otherwise) {
        sample({
            clock: sessionCheckFailed,
            fn: () => ({}),
            target: config.otherwise.open
        })
    }

    sessionCheckStarted.watch(() => {
        console.log('sessionCheckStarted', $session.getState())
    })
    sessionEstablished.watch(() => {
        console.log('sessionEstablished', $session.getState())
    })
    sessionCheckFailed.watch(() => {
        console.log('sessionCheckFailed', $session.getState())
    })

    return chainRoute({
        route,
        beforeOpen: sessionCheckStarted,
        openOn: sessionEstablished,
        cancelOn: sessionCheckFailed,
    })
}

export const chainAuthorized = withAuthorized

export const withUnauthorized = <Params extends object>(route: RouteInstance<Params>, config?: { otherwise: RouteInstance<object>}) => {
    const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
    const sessionEstablished = createEvent()
    const sessionCheckFailed = createEvent()

    sample({
        clock: sessionCheckStarted,
        filter: $session.map(session => session === 'anonymous'),
        target: sessionEstablished,
    })
    sample({
        clock: sessionCheckStarted,
        filter: $session.map(session => session === 'authenticated'),
        target: sessionCheckFailed,
    })

    sessionCheckStarted.watch(() => {
        console.log('sessionCheckStarted', $session.getState())
    })
    sessionEstablished.watch(() => {
        console.log('sessionEstablished', $session.getState())
    })
    sessionCheckFailed.watch(() => {
        console.log('sessionCheckFailed', $session.getState())
    })

    if (config?.otherwise) {
        sample({
            clock: sessionCheckFailed,
            fn: () => ({}),
            target: config.otherwise.open
        })
    }

    return chainRoute({
        route,
        beforeOpen: sessionCheckStarted,
        openOn: sessionEstablished,
        cancelOn: sessionCheckFailed,
    })
}
