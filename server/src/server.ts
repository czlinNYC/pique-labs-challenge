import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';

interface Id {
  id: number
}

interface Todo {
  id: number,
  item: string,
  completed: boolean
}
const items: Todo[] = [
  {
    item: 'First Todo',
    id: 1,
    completed: false,
  },
  {
    item: 'Second Todo',
    id: 2,
    completed: false,
  },
];

const resolvers = {
  Query: {
    items: () => items,
    // was having trouble with the find() method. was throwing an
    // error so in interest of saving time I manually wrote it.
    item(parent: any, args: Id) {
      let result;
      items.forEach((item) => {
        if (item.id === args.id) {
          result = item;
        }
      });
      return result;
    },
  },
  Mutation: {
    createToDo: (parent: any, { input }: any) => {
      items.push(input);
      return {
        success: true, message: 'Successful Todo creation', id: input.id, item: input.item,
      };
    },
    deleteToDo: (parent: any, { input }: any) => {
      let success = false;
      items.forEach((item, index) => {
        if (item.id == input.id.toString()) {
          items.splice(index, 1);
          success = true;
        }
      });
      if (success === false) {
        return {
          success, message: 'Todo Delete Failed', id: input.id, item: input.item,
        };
      }
      return {
        success, message: 'Successful Todo delete', id: input.id, item: input.item,
      };
    },
    updateToDo: (parent: any, { input }: any) => {
      let success = false;
      const id = input.id.toString();
      items.forEach((item, index) => {
        if (item.id == id) {
          items.splice(index, 1);
          items.push(input);
          success = true;
        }
      });
      if (success === false) {
        return {
          success, message: 'Todo Update Failed', id: input.id, item: input.item,
        };
      }

      return {
        success, message: 'Successful Todo update', id: input.id, item: input.item,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
