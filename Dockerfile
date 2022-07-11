FROM node:14.17
COPY . /app
WORKDIR /app
RUN yarn install 
RUN yarn build
EXPOSE 7777
CMD yarn start