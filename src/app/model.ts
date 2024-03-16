import {createGate, useGate} from "effector-react"

import {sessionModel} from "@/entities/session"

function createGateHook<T>(props?: T) {
    const Gate = createGate()

    const useGateHook = () => useGate(Gate, props)

    return [Gate, useGateHook] as const
}

const [AppGate, useAppGate] = createGateHook()

AppGate.open.watch(() => {
    console.log('AppGate opened')
})
AppGate.close.watch(() => {
    console.log('AppGate closed')
})

export const $isInitialized = sessionModel.$isSessionInitialized
export const appInitialized = sessionModel.sessionInitialized

export {
    useAppGate,
}
