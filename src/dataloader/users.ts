import DataLoader from 'dataloader';
import { userModel } from '../model';
import { User } from '../generated-types';

export default {
  users: new DataLoader<number, User>(async userIds => {
    const users = await userModel.getUsersByIds(userIds)
    return userIds.map(userId => users.find(user => user.id === userId))
  }),
}