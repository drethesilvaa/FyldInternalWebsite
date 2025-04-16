import type { Schema, Struct } from '@strapi/strapi';

export interface GridItems extends Struct.ComponentSchema {
  collectionName: 'components_grid_items';
  info: {
    description: '';
    displayName: 'Items';
    icon: 'apps';
  };
  attributes: {
    Colunas: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      >;
    Content: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface UiAccordion extends Struct.ComponentSchema {
  collectionName: 'components_ui_accordions';
  info: {
    displayName: 'Accordion';
    icon: 'server';
  };
  attributes: {
    Content: Schema.Attribute.Blocks & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiCardItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_card_items';
  info: {
    description: '';
    displayName: 'Card Item';
  };
  attributes: {
    Content: Schema.Attribute.RichText & Schema.Attribute.Required;
    Imagem: Schema.Attribute.Media<'images'>;
  };
}

export interface UiCards extends Struct.ComponentSchema {
  collectionName: 'components_ui_cards';
  info: {
    description: '';
    displayName: 'Cards';
  };
  attributes: {
    colunas: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    Horizontal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    Items: Schema.Attribute.Component<'ui.card-item', true>;
  };
}

export interface UiCarousel extends Struct.ComponentSchema {
  collectionName: 'components_ui_carousels';
  info: {
    displayName: 'Carousel';
  };
  attributes: {
    Items: Schema.Attribute.Component<'ui.card-item', true> &
      Schema.Attribute.Required;
    Slides: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
  };
}

export interface UiGridSection extends Struct.ComponentSchema {
  collectionName: 'components_ui_grid_sections';
  info: {
    description: '';
    displayName: 'Grid Section';
    icon: 'grid';
  };
  attributes: {
    Colunas: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    Item: Schema.Attribute.Component<'grid.items', true>;
  };
}

export interface UiRichTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_ui_rich_text_blocks';
  info: {
    description: '';
    displayName: 'Rich Text Block';
  };
  attributes: {
    Content: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'grid.items': GridItems;
      'ui.accordion': UiAccordion;
      'ui.card-item': UiCardItem;
      'ui.cards': UiCards;
      'ui.carousel': UiCarousel;
      'ui.grid-section': UiGridSection;
      'ui.rich-text-block': UiRichTextBlock;
    }
  }
}
