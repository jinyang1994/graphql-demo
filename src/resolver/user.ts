import { Resolvers } from '../generated-types';

const resolvers: Resolvers = {
  User: {
    async followingUsers (user, _, { dataloaders }) {
      const users = await dataloaders.users.loadMany(user.followingUserIds)
      console.log(user.id, user.followingUserIds, users.map(user => user.id))
      // return userModel.getUsersByIds(user.followingUserIds)
      return users
    },
    async bestFriend (user, _, { dataloaders }) {
      const bestFriend = await dataloaders.users.load(user.bestFriendId)
      console.log(user.id, user.bestFriendId, bestFriend.id, bestFriend.key)
      return bestFriend
      // return userModel.getUserById(user.bestFriendId)
    },
    async posts (user, _, { dataloaders }) {
      const posts = await dataloaders.posts.load(user.id)
      console.log(user.id, posts)
      return posts
      // return postModel.getPostsByUserId(user.id)
    }
  }
}

export default resolvers;
