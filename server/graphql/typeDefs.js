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

   type About {
    _id: ID!
    description: String!
    image: String!
    public_id: String
   }

   type Skill {
    _id: ID!
    skillName: String!
    skillImage: String!
    public_id: String
   }

   type LogoutResponse {
    message: String!
   }

   type DeleteResponse {
    message: String!
   }

   type Query {
    checkAuth: User!,
    getIntro: [Intro!]!
    getAbout: [About!]!
    getSkills: [Skill!]!
   }

    type Mutation {
     login(username: String!, password: String!): AuthPayload
     logout: LogoutResponse
     createIntro(name: String!, techStack: [String!]!, description: String!, image: Upload!, file: Upload!): Intro
     updateIntro(_id: ID!, name: String, techStack: [String!], description: String, image: Upload, file: Upload): Intro
     deleteIntro(_id: ID!): DeleteResponse
     createAbout(description: String!, image: Upload!): About
     updateAbout(_id: ID!, description: String, image: Upload): About
     deleteAbout(_id: ID!): DeleteResponse
     createSkill(skillName: String!, skillImage: Upload!): Skill
     updateSkill(_id: ID!, skillName: String, skillImage: Upload): Skill
     deleteSkill(_id: ID!): DeleteResponse
    }
`