import DataLoader from 'dataloader';
import { userModel } from '../model';
import { User } from '../generated-types';

export default () => {
  return {
    users: new DataLoader<string, User>(async userIds => {
      const users = await userModel.getUsersByIds(userIds)
      return userIds.map(userId => users.find(user => user.id === userId))
    }),
  }
}