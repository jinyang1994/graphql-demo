import DataLoader from 'dataloader'

export interface Context {
  dataloaders: {
    users: DataLoader<number, any>
    posts: DataLoader<number, any>
  };
}