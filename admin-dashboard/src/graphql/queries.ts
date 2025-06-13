import { gql } from "@apollo/client";

export const CHECK_AUTH = gql`
  query CheckAuth {
    checkAuth {
      _id
      username
    }
  }
`;


export const GET_INTRO = gql`
  query GetIntro {
    getIntro {
      _id
      name
      techStack
      description
      image
      file
    }
  }
`;