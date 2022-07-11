import { userModel } from '../model'
import { Resolvers } from '../generated-types';

const resolvers: Resolvers = {
  Query: {
    user(_, { name }) {
      return userModel.getUserByName(name)
    },
    allUsers() {
      return userModel.getAllUsers()
    }
  }
}

export default resolvers
