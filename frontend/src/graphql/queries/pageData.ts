import { gql } from "@apollo/client";

export const GET_PAGE_DATA = gql`
  fragment RichTextBlock on ComponentUiRichTextBlock {
    id
    Content
  }
  fragment GridSection on ComponentUiGridSection {
    id
    Colunas
    Item {
      Content
      Cards {
        Horizontal
        Items {
          Content
          Imagem {
            url
          }
        }
      }
    }
  }

  fragment Carousel on ComponentUiCarousel {
    id
    Slides
    Items {
      Content
      Imagem {
        url
      }
    }
  }

  fragment Cards on ComponentUiCards {
    id
    Horizontal
    cardsItems: Items {
      Content
      Imagem {
        url
      }
    }
  }
  fragment Accordion on ComponentUiAccordion {
    id
    Title
    Content
  }

  fragment ErrorFragment on Error {
    code
    message
  }

  query pageBySlug($slug: String!) {
    pages_connection(filters: { slug: { eq: $slug } }) {
      nodes {
        id: documentId
        Title
        slug
        Content {
          ...RichTextBlock
          ...GridSection
          ...Carousel
          ...Cards
          ...Accordion
          ...ErrorFragment
        }
      }
    }
  }
`;
