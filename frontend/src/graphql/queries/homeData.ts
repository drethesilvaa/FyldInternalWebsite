import { gql } from "@apollo/client";

const RICH_TEXT_BLOCK = gql`
  fragment RichTextBlock on ComponentUiRichTextBlock {
    id
    content: Content
    __typename
  }
`;

const GRID_SECTION = gql`
  fragment GridSection on ComponentUiGridSection {
    id
    Colunas
    __typename
    Item {
      Content
      Colunas
    }
  }
`;

const CAROUSEL = gql`
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
`;

const CARDS = gql`
  fragment Cards on ComponentUiCards {
    id
    Horizontal
    colunas
    cardsItems: Items {
      Content
      aspectRatio
      Imagem {
        url
        alt: alternativeText
      }
    }
    __typename
  }
`;

const CARD_ITEM = gql`
  fragment CardItem on ComponentUiCardItem {
    id
    Imagem {
      url
    }
    aspectRatio
    content: Content
    __typename
  }
`;

const ACCORDION = gql`
  fragment Accordion on ComponentUiAccordion {
    id
    items: Items {
      Titulo
      content
    }
    __typename
  }
`;

const ERROR_FRAGMENT = gql`
  fragment ErrorFragment on Error {
    code
    message
  }
`;

export const GET_HOME_DATA = gql`
  ${RICH_TEXT_BLOCK}
  ${GRID_SECTION}
  ${CAROUSEL}
  ${CARDS}
  ${CARD_ITEM}
  ${ACCORDION}
  ${ERROR_FRAGMENT}

  query HomeData {
    home {
      VideoLink
      FyldIcon {
        url
        alternativeText
      }
      placeholderImage {
        url
        alternativeText
      }
      Empresa {
        ...RichTextBlock
        ...GridSection
        ...Carousel
        ...Cards
        ...CardItem
        ...Accordion
        ...ErrorFragment
      }
      TyFyld {
        ...RichTextBlock
        ...GridSection
        ...Carousel
        ...Cards
        ...CardItem
        ...Accordion
        ...ErrorFragment
      }
      ParteDaFyld {
        ...RichTextBlock
        ...Carousel
        ...ErrorFragment
      }
    }
  }
`;
