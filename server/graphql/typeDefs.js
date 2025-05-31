export const typeDefs = `#graphql
   type User {
    _id: ID!
    username: String!
   }

   type AuthPayload {
    user: User!
    token: String!
   }

   type LogoutResponse {
    message: String!
   }

   type Query {
    checkAuth: User!,
   }

    type Mutation {
     login(username: String!, password: String!): AuthPayload
     logout: LogoutResponse
    }
`