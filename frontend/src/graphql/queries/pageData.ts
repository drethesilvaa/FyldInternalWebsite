import { gql } from "@apollo/client";

export const GET_PAGE_DATA = gql`
  fragment RichTextBlock on ComponentUiRichTextBlock {
    id
    content: Content
    __typename
  }
  fragment GridSection on ComponentUiGridSection {
    id
    Colunas
    Item {
      Content
      Colunas
    }
    __typename
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
    __typename
  }

  fragment Cards on ComponentUiCards {
    id
    Horizontal
    colunas
    cardsItems: Items {
      Content
      aspectRatio
      Imagem {
        url
      }
    }
    __typename
  }

  fragment Accordion on ComponentUiAccordion {
    id
    items: Items {
      Titulo
      content
    }
    __typename
  }

  fragment ErrorFragment on Error {
    code
    message
  }

  query pageBySlug($slug: String!) {
    pages_connection(filters: { slug: { eq: $slug } }) {
      nodes {
        id: documentId
        pageBanner {
          url
          alternativeText
        }
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
