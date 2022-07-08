import DataLoader from 'dataloader';
import { postModel } from '../model'
import { Post } from '../generated-types';

export default {
  posts: new DataLoader<number, Post[]>(async userIds => {
    const posts = await postModel.getPostsByUserIds(userIds)

    return userIds.map(userId =>
      posts.filter(post => post.userId === userId)
    )
  })
}