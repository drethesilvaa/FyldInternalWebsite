# CMS Data Structure Documentation

This directory contains all the content and configuration data previously stored in Strapi, now structured as JSON files for local management.

## Directory Structure

```
cms/
├── pages/                 # Individual page content files
│   ├── home.json         # Home page
│   ├── about.json        # About page
│   ├── services.json     # Services page
│   └── [slug].json       # Other pages by slug
└── config/               # Global configuration
    ├── footer.json       # Footer content
    ├── navbar.json       # Navigation menu
    └── metadata.json     # Migration metadata
```

## Data Schema

### Page Object (`pages/[slug].json`)

```json
{
  "id": "string",                    // Unique identifier
  "documentId": "string",            // Document ID from Strapi
  "Title": "string",                 // Page title (required)
  "slug": "string",                  // URL slug (required, unique)
  "pageBanner": {                    // Banner image (required)
    "id": "string",
    "name": "string",
    "alternativeText": "string",
    "url": "/cms-media/...",         // Path to media
    "width": number,
    "height": number
  },
  "Content": [
    // Dynamic components array - see components section below
  ],
  "ParentPage": {
    "id": "string",
    "slug": "string",
    "Title": "string"
  },
  "createdAt": "ISO-8601 datetime",
  "updatedAt": "ISO-8601 datetime"
}
```

### Component Types

#### RichTextBlock
```json
{
  "id": "string",
  "__typename": "ComponentUiRichTextBlock",
  "Content": "<p>HTML content here...</p>"
}
```

#### Carousel
```json
{
  "id": "string",
  "__typename": "ComponentUiCarousel",
  "Slides": 3,
  "Items": [
    {
      "id": "string",
      "Content": "Slide text content",
      "Imagem": {
        "id": "string",
        "url": "/cms-media/carousel-slide.jpg",
        "alternativeText": "Slide description"
      },
      "aspectRatio": "16:9"
    }
  ]
}
```

#### Cards
```json
{
  "id": "string",
  "__typename": "ComponentUiCards",
  "Horizontal": true,
  "colunas": 3,
  "padding": "px32",
  "Items": [
    {
      "id": "string",
      "Content": "Card content",
      "Imagem": {
        "url": "/cms-media/card-image.jpg",
        "alternativeText": "Card image"
      },
      "aspectRatio": "1:1"
    }
  ]
}
```

#### Accordion
```json
{
  "id": "string",
  "__typename": "ComponentUiAccordion",
  "Items": [
    {
      "id": "string",
      "Titulo": "Item Title",
      "content": "Item content - can be HTML"
    }
  ]
}
```

#### GridSection
```json
{
  "id": "string",
  "__typename": "ComponentUiGridSection",
  "Colunas": 2,
  "Item": [
    {
      "id": "string",
      "Content": "Grid item content",
      "Colunas": 1
    }
  ]
}
```

#### Spacer
```json
{
  "id": "string",
  "__typename": "ComponentUiSpacer",
  "tamanho": 32
}
```

#### BentoGrid
```json
{
  "id": "string",
  "__typename": "ComponentUiBentoGrid",
  "Title": "Section Title",
  "Color": "#ffffff",
  "orientation": "vertical",
  "BentoItems": {
    "Items": [
      {
        "Imagem": {
          "url": "/cms-media/bento-item.jpg",
          "alternativeText": "Item description"
        },
        "Content": "Item content"
      }
    ]
  }
}
```

#### LinksGroup
```json
{
  "id": "string",
  "__typename": "ComponentUiLinksGroup",
  "links": [
    {
      "id": "string",
      "linkTitle": "Link text",
      "page": {
        "id": "string",
        "slug": "page-slug",
        "Title": "Page Title",
        "pageBanner": {
          "url": "/cms-media/...",
          "alternativeText": "..."
        }
      }
    }
  ]
}
```

#### ContactsCarrousel
```json
{
  "id": "string",
  "__typename": "ComponentUiContactsCarrousel",
  "title": "Team Members",
  "contacts": [
    {
      "id": "string",
      "name": "Person Name",
      "role": "Job Title",
      "email": "email@example.com",
      "photo": {
        "url": "/cms-media/contact-photo.jpg",
        "alternativeText": "Person name"
      }
    }
  ]
}
```

#### Tree
```json
{
  "id": "string",
  "__typename": "ComponentUiTree",
  "data": "[{\"id\":\"1\",\"label\":\"Node\",\"children\":[]}]"
}
```

### Footer Config (`config/footer.json`)

```json
{
  "id": "string",
  "documentId": "string",
  "address": "<p>HTML address content</p>",
  "SocialLinks": [
    {
      "id": "string",
      "SocialMedia": "LinkedIn|Twitter|Instagram|GitHub",
      "link": "https://..."
    }
  ]
}
```

### Navbar Config (`config/navbar.json`)

```json
{
  "id": "string",
  "documentId": "string",
  "logo": {
    "id": "string",
    "url": "/cms-media/logo.svg",
    "alternativeText": "Logo"
  },
  "menuItems": [
    {
      "id": "string",
      "label": "Menu Label",
      "page": {
        "id": "string",
        "slug": "page-slug",
        "Title": "Page Title"
      }
    }
  ]
}
```

## Media Files

All media files are stored in `/frontend/public/cms-media/` and referenced via `/cms-media/filename` URLs in the JSON data.

## Migration Steps

1. **Pull Strapi Data**: Use `migrate-strapi.js` script to pull all data from Strapi
   ```bash
   STRAPI_URL=https://strapi-backend.onrender.com \
   STRAPI_TRANSFER_TOKEN=your_token_here \
   node migrate-strapi.js
   ```

2. **Transform Data**: Convert Strapi exports into the JSON structure above

3. **Update Frontend**: Change API layer to read from local JSON files

4. **Update Hooks**: Modify query hooks to load data from `/src/data/cms` instead of Strapi GraphQL

5. **Test**: Verify all pages render correctly with new data source

## Adding/Editing Content

1. Create or edit JSON files in `pages/` or `config/`
2. Place media files in `/public/cms-media/`
3. Update file paths in JSON to reference the new media
4. Test the page to ensure rendering works correctly

## Future Dashboard

Once a custom dashboard is created, it should:
- Read/write to these JSON files
- Handle media uploads to `/public/cms-media/`
- Validate against the schema above
- Generate proper component structures with `__typename` fields
