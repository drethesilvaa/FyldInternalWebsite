import { gql } from "@apollo/client";

export const GET_NAVBAR_DATA = gql`
  query Pages {
    home {
      FyldIcon {
        url
        alternativeText
      }
    }
    pages(pagination: { limit: -1 }, sort: "createdAt:asc") {
      id: documentId
      Title
      slug
      ParentPage {
        id: documentId
        Title
        slug
      }
    }
  }
`;
