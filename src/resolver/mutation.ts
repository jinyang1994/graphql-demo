import { userModel } from '../model'
import { Resolvers } from '../generated-types';

const resolvers: Resolvers = {
  Mutation: {
    updateUser(_, { id, data }) {
      console.log(id, data)
      const user = userModel.updateUserById(id, data)

      return user
    }
  }
}

export default resolvers
