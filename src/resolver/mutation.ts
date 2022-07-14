import { userModel, postModel } from '../model'
import { Resolvers } from '../generated-types';

const resolvers: Resolvers = {
  Mutation: {
    async updateUser(_, { id, data }) {
      const user = await userModel.updateUserById(id, data)

      return user
    },
    async createUser(_, { data }) {
      const user = await userModel.createUser(data)

      return user
    },
    async createPost(_, { data }) {
      const post = await postModel.createPost(data)

      return post
    }
  }
}

export default resolvers
