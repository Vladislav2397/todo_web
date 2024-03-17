import {createGate, useGate} from "effector-react"

export function createGateHook<T = void>() {
    const Gate = createGate<T>()

    const useGateHook = (props: T) => useGate(Gate, props)

    return [Gate, useGateHook] as const
}
