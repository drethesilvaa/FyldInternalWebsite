import { gql } from "@apollo/client";

export const GET_PAGE_DATA = gql`
  fragment RichTextBlock on ComponentUiRichTextBlock {
    id
    Content
    __typename
  }
  fragment GridSectionV2 on ComponentUiGridSection {
    id
    Colunas
    Item {
      Content
      Colunas
    }
    __typename
  }

  fragment SpacerComponent on ComponentUiSpacer {
    id
    tamanho
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
      aspectRatio
    }
    __typename
  }

  fragment CardsV2 on ComponentUiCards {
    id
    Horizontal
    colunas
    padding
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

  fragment LinksGroup on ComponentUiLinksGroup {
    id
    links {
      linkTitle
      page {
        slug
        pageBanner {
          alternativeText
          url
        }
        ParentPage {
          slug
        }
      }
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
          ...GridSectionV2
          ...Carousel
          ...CardsV2
          ...Accordion
          ...SpacerComponent
          ...LinksGroup
          ...ErrorFragment
        }
      }
    }
  }
`;
