export const postModel = (() => {
  const posts = [
    { id: 1, userId: 1, title: 'Hello World by user A', date: new Date().toString(), count: 444 },
    { id: 2, userId: 1, title: 'GraphQL Forever by user A', date: new Date().toString(), count: 456 },
    { id: 3, userId: 2, title: 'Apollo So Cool by user B', date: new Date().toString(), count: 789 },
    { id: 4, userId: 4, title: 'Sandbox rules by user D', date: new Date().toString(), count: 246 },
    { id: 5, userId: 3, title: 'DataLoader Example by user C', date: new Date().toString(), count: 357 }
  ]
  return {
    getPostById: id =>
      Promise.resolve(posts.find(post => post.id === id)),
    getPostsByUserId: userId =>
      Promise.resolve(posts.filter(post => post.userId === userId)),
    getPostsByUserIds: userIds =>
      Promise.resolve(
        posts.filter(post => userIds.includes(post.userId))
      )
  }
})()

export const userModel = (() => {
  const users = [
    { id: 1, num: 7, name: 'A', bestFriendId: 2, followingUserIds: [2, 3, 4] },
    { id: 2, num: 8, name: 'B', bestFriendId: 1, followingUserIds: [1, 3, 4, 5] },
    { id: 3, num: 9, name: 'C', bestFriendId: 4, followingUserIds: [1, 2, 5] },
    { id: 4, num: 6, name: 'D', bestFriendId: 5, followingUserIds: [1, 2, 5] },
    { id: 5, num: 5, name: 'E', bestFriendId: 4, followingUserIds: [2, 3, 4] }
  ]

  return {
    getUserById: id =>
      Promise.resolve(users.find(user => user.id === id)),
    getUserByName: name =>
      Promise.resolve(
        users.find(user => user.name === name)
      ),
    getUsersByIds: ids =>
      Promise.resolve(
        users.filter(user => ids.includes(user.id))
      ),
    getAllUsers: () => Promise.resolve(users)
  }
})()