import { gql } from 'apollo-server';

export const typeDefs = gql`

  type ToDo {
    item: String!
    id: ID!
    completed: Boolean!
  }

  type Query {
    items: [ToDo]
    item(id: ID!): ToDo
  }
  input Input {
    item: String!
    id: ID!
    completed: Boolean!
  }
  type Mutation {
    createToDo(input: Input!): ServerResponse!
    deleteToDo(input: Input!): ServerResponse!
    updateToDo(input: Input!): ServerResponse! 
  }

  type ServerResponse {
    success: Boolean!
    item: String!
    id: ID!
    message: String!
  }

`;
