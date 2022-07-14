import DataLoader from 'dataloader'

export interface Context {
  dataloaders: {
    users: DataLoader<string, any>
    posts: DataLoader<string, any>
  };
}