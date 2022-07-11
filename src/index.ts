import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import Koa from 'koa';
import http from 'http';
import path from 'path';
import { loadSchema } from '@graphql-tools/load';
import { loadFiles } from '@graphql-tools/load-files';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import merge from 'lodash/merge';

async function startApolloServer() {
  const httpServer = http.createServer();
  const dataloaders = await loadFiles(path.join(__dirname, 'dataloader/**/*.{js,ts}'))
  const resolvers = await loadFiles(path.join(__dirname, 'resolver/**/*.{js,ts}'))
  const schema = await loadSchema(path.join(__dirname, 'schema/**/*.graphql'), {
    loaders: [new GraphQLFileLoader()],
    resolvers
  })
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async () => {
      return {
        dataloaders: merge(...dataloaders.map(init => init()))
      }
    }
  });

  await server.start();
  const app = new Koa();
  server.applyMiddleware({ app });
  httpServer.on('request', app.callback());
  await new Promise<void>(resolve => httpServer.listen({ port: 1234 }, resolve));
  console.log(`🚀 Server ready at http://localhost:1234${server.graphqlPath}`);
  return { server, app };
}

startApolloServer()
