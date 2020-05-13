import { db } from '../utils/firebase'
import { IContainer } from '../interfaces/container'

type FBQuery = firebase.firestore.Query<IContainer>
type FilterFn = (reference: FBQuery) => FBQuery
export const getList = (collection: string, filterFn: FilterFn) => {
  let req: FBQuery = (db.collection(collection) as unknown) as FBQuery

  if (filterFn) {
    req = filterFn(req)
  }

  return req.get().then((querySnapshot) =>
    querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  )
}

export const getItem = (collection: string, id: string) =>
  db
    .collection(collection)
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        throw new Error('This document is not exist')
      }
      return {
        id: doc.id,
        ...doc.data(),
      }
    })

export const addItem = (collection: string, data: any) => db.collection(collection).add(data)

export const saveItem = (collection: string, { id, ...data }: any) => {
  if (id) {
    return db.collection(collection).doc(id).update(data)
  }

  return db.collection(collection).add(data)
}

export const removeItem = (collection: string, id: string) => db.collection(collection).doc(id).delete()
