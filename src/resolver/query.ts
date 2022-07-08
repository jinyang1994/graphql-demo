import { userModel } from '../model'
import { Resolvers } from '../generated-types';

const resolvers: Resolvers = {
  Query: {
    user(_, { name }) {
      return userModel.getUserByName(name)
    },
    allUsers() {
      console.log(123123)
      return userModel.getAllUsers()
    }
  }
}

export default resolvers
