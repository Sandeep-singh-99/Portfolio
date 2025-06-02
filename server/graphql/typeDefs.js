export const typeDefs = `#graphql
   scalar Upload

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

   type DeleteResponse {
    message: String!
   }

   type Intro {
    _id: ID!
    name: String!
    techStack: [String!]!
    description: String!
    image: String!
    public_id: String
    file: String!
    filePublic_id: String
   }

   type Query {
    checkAuth: User!,
    getIntro: [Intro!]!
   }

    type Mutation {
     login(username: String!, password: String!): AuthPayload
     logout: LogoutResponse
     createIntro(name: String!, techStack: [String!]!, description: String!, image: Upload!, file: Upload!): Intro
     updateIntro(_id: ID!, name: String, techStack: [String!], description: String, image: Upload, file: Upload): Intro
     deleteIntro(_id: ID!): DeleteResponse
    }
`