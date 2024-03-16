import {createGate, useGate} from "effector-react"

export function createGateHook<T>(props?: T) {
    const Gate = createGate()

    const useGateHook = () => useGate(Gate, props)

    return [Gate, useGateHook] as const
}
