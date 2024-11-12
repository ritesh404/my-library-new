import { gql } from "@apollo/client";

export const AUTHORS_QUERY = gql`
  query Authors(
    $limit: Int
    $offset: Int
    $id: ID
    $name: String
    $born_year: String
  ) {
    authors(
      limit: $limit
      offset: $offset
      id: $id
      name: $name
      born_year: $born_year
    ) {
      authors {
        id
        name
        biography
        born_date
        image_url
        books {
          id
          title
          published_date
          description
        }
      }
      count
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor(
    $name: String!
    $biography: String
    $born_date: String
    $image_url: String
  ) {
    createAuthor(
      name: $name
      biography: $biography
      born_date: $born_date
      image_url: $image_url
    ) {
      id
      name
      biography
      born_date
      image_url
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor(
    $id: ID!
    $name: String!
    $biography: String
    $born_date: String
    $image_url: String
  ) {
    updateAuthor(
      id: $id
      name: $name
      biography: $biography
      born_date: $born_date
      image_url: $image_url
    ) {
      id
      name
      biography
      born_date
      image_url
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DelteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      biography
      born_date
    }
  }
`;
