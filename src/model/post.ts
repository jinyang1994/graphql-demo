import db from '../firestore'
import { PostInput } from '../generated-types'

const collectionRef = db.collection('post')

export default {
  async getPostById(id: string) {
    const post = await collectionRef.doc(id).get()
    const data = post.data()

    return { ...data, id }
  },
  async getPostsByUserId(userId: string) {
    const posts = await collectionRef.where('userId', '==', userId).get()

    if (posts.empty) return []
    return posts.docs.map(post => ({
        id: post.id,
        ...post.data()
    }))
  },
  async getPostsByUserIds(userIds: readonly string[]) {
    const posts = await collectionRef.where('userId', 'in', userIds).get()

    if (posts.empty) return []
    return posts.docs.map(post => ({
        id: post.id,
        ...post.data() as any
    }))
  },
  async createPost(data: PostInput) {
    const post = collectionRef.doc()
    const date = new Date().toString()
    
    await post.set({ ...data, date })

    return { id: post.id, date, ...data }
  },
  async updatePostById(id: string, data: PostInput) {
    const post = collectionRef.doc(id)
    await post.update(data)
    const updated = await post.get()
    const updatedData = updated.data()

    return { id: post.id, ...updatedData }
  }
}
