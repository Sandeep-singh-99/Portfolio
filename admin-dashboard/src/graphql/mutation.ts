import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;


export const DELETE_INTRO = gql`
  mutation DeleteIntro($_id: ID!) {
    deleteIntro(_id: $_id) {
      message
    }
  }
`;


export const ADD_INTRO = gql`
  mutation createIntro($name: String!, $description: String!, $techStack: [String!]!, $image: String!, $file: String!) {
    createIntro(name: $name, description: $description, techStack: $techStack, image: $image, file: $file) {
      _id
      name
      description
      techStack
      image
      file
    }
  }
`;