import {sessionModel} from "@/entities/session"

import {createGateHook} from "@/packages/effector-helpers"

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
