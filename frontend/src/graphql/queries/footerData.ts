import { gql } from "@apollo/client";

export const GET_FOOTER_DATA = gql`
  query Footer {
    footer {
      address
      SocialLinks {
        link
        SocialMedia
      }
    }
  }
`;
