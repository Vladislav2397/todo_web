import {collection, getDocs, addDoc, doc, updateDoc, getFirestore} from "firebase/firestore"

import {app} from "@/shared/integrations/firebase"

const db = getFirestore(app)

export const getQuery = async (path: string) => {
    return getDocs(collection(db, path))
}

export const addQuery = async (path: string, data: any) => {
    return addDoc(collection(db, path), data)
}

export const updateQuery = async (path: string, data: any) => {
    const docRef = doc(db, path, data.id)

    await updateDoc(docRef, data)

    return data
}
