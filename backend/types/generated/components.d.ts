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
    Content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface UiAccordion extends Struct.ComponentSchema {
  collectionName: 'components_ui_accordions';
  info: {
    description: '';
    displayName: 'Accordion';
    icon: 'server';
  };
  attributes: {
    Items: Schema.Attribute.Component<'util.title-content', true>;
  };
}

export interface UiCardItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_card_items';
  info: {
    description: '';
    displayName: 'Card Item';
  };
  attributes: {
    aspectRatio: Schema.Attribute.Enumeration<
      [
        'Medium\u00A0Format',
        'Standard',
        'Square',
        'Classic',
        'Widescreen',
        'Vertical Portrait',
        'Cinemascope Panoramic',
      ]
    > &
      Schema.Attribute.DefaultTo<'Medium\u00A0Format'>;
    Content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
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
    description: '';
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
    Content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface UiSpacer extends Struct.ComponentSchema {
  collectionName: 'components_ui_spacers';
  info: {
    displayName: 'spacer';
    icon: 'crop';
  };
  attributes: {
    tamanho: Schema.Attribute.Enumeration<
      ['px12', 'px16', 'px24', 'px32', 'px48', 'px64', 'px96', 'px128']
    >;
  };
}

export interface UtilList extends Struct.ComponentSchema {
  collectionName: 'components_util_lists';
  info: {
    displayName: 'List';
    icon: 'bulletList';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    SocialMedia: Schema.Attribute.Enumeration<
      ['Website', 'Instagram', 'Facebook', 'Spotify', 'Linkedin']
    > &
      Schema.Attribute.Required;
  };
}

export interface UtilTitleContent extends Struct.ComponentSchema {
  collectionName: 'components_util_title_contents';
  info: {
    displayName: 'title_content';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    Titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilTitulo extends Struct.ComponentSchema {
  collectionName: 'components_util_titulo_s';
  info: {
    displayName: 'Titulo ';
    icon: 'bold';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      [
        'base',
        'primary',
        'secondary',
        'accent',
        'neutral',
        'info',
        'success',
        'warning',
        'error',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'base'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
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
      'ui.spacer': UiSpacer;
      'util.list': UtilList;
      'util.title-content': UtilTitleContent;
      'util.titulo': UtilTitulo;
    }
  }
}
