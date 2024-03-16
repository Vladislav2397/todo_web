import { getAuth, signInWithPopup } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"

import { app } from '@/shared/integrations/firebase'

const provider = new GoogleAuthProvider()

const auth = getAuth(app)

type FailureAuth = {
    message: string
}

type SignInResult = { status: 'ok' } | { status: 'error', error: FailureAuth }

export async function signInByGoogle(): Promise<SignInResult> {
    try {
        await signInWithPopup(auth, provider)

        return { status: 'ok' }
    } catch (error) {
        // @ts-expect-error TODO Add types for firebase error
        return { status: 'error', error: { message: error.message } }
    }
}
