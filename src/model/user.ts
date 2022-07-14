import { FieldPath } from 'firebase-admin/firestore'
import db from '../firestore'
import { UserInput } from '../generated-types'

const collectionRef = db.collection('user')

export default {
  async getUserById(id: string) {
    const user = await collectionRef.doc(id).get()
    const data = user.data()

    return { id, ...data }
  },
  async getUsersByIds(ids: readonly string[]) {
    const users = await collectionRef.where(FieldPath.documentId(), 'in', ids).get()

    if (users.empty) return []
    return users.docs.map(user => ({
        id: user.id,
        ...user.data()
    }))
  },
  async getUserByName(name: string) {
    const users = await collectionRef.where('name', '==', name).get()

    if (users.empty) return null
    const [user] = users.docs
    return {
      id: user.id,
      ...user.data()
    }
  },
  async getAllUsers() {
    const users = await collectionRef.get()

    if (users.empty) return []
    return users.docs.map(user => ({
        id: user.id,
        ...user.data()
    }))
  },
  async createUser(data: UserInput) {
    const user = collectionRef.doc()

    await user.set(data)

    return { id: user.id, ...data }
  },
  async updateUserById(id: string, data: UserInput) {
    const user = collectionRef.doc(id)
    await user.update(data)
    const updated = await user.get()
    const updatedData = updated.data()  

    return { id: user.id, ...updatedData }
  }
}
