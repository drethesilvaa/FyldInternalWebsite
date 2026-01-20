/**
 * CMS Data Loader
 * Loads page and configuration data from local JSON files
 * Replaces Strapi GraphQL queries
 */

export interface PageData {
  id: string;
  documentId: string;
  Title: string;
  slug: string;
  pageBanner: MediaFile;
  Content: Component[];
  ParentPage?: {
    id: string;
    slug: string;
    Title: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MediaFile {
  id: string;
  name?: string;
  url: string;
  alternativeText: string;
  width?: number;
  height?: number;
  formats?: Record<string, any>;
}

export interface FooterData {
  id: string;
  documentId: string;
  address: string;
  SocialLinks: Array<{
    id: string;
    SocialMedia: string;
    link: string;
  }>;
}

export interface NavbarData {
  id: string;
  documentId: string;
  logo: MediaFile;
  menuItems: Array<{
    id: string;
    label: string;
    page: {
      id: string;
      slug: string;
      Title: string;
    };
  }>;
}

export type Component =
  | RichTextBlockComponent
  | CarouselComponent
  | CardsComponent
  | AccordionComponent
  | GridSectionComponent
  | SpacerComponent
  | BentoGridComponent
  | LinksGroupComponent
  | ContactsCarrouselComponent
  | TreeComponent;

export interface RichTextBlockComponent {
  id: string;
  __typename: 'ComponentUiRichTextBlock';
  Content: string;
}

export interface CarouselComponent {
  id: string;
  __typename: 'ComponentUiCarousel';
  Slides: number;
  Items: Array<{
    id: string;
    Content: string;
    Imagem: MediaFile;
    aspectRatio: string;
  }>;
}

export interface CardsComponent {
  id: string;
  __typename: 'ComponentUiCards';
  Horizontal?: boolean;
  colunas: number;
  padding?: string;
  Items: Array<{
    id: string;
    Content: string;
    Imagem: MediaFile;
    aspectRatio: string;
  }>;
}

export interface AccordionComponent {
  id: string;
  __typename: 'ComponentUiAccordion';
  Items: Array<{
    id: string;
    Titulo: string;
    content: string;
  }>;
}

export interface GridSectionComponent {
  id: string;
  __typename: 'ComponentUiGridSection';
  Colunas: number;
  Item: Array<{
    id: string;
    Content: string;
    Colunas: number;
  }>;
}

export interface SpacerComponent {
  id: string;
  __typename: 'ComponentUiSpacer';
  tamanho: number;
}

export interface BentoGridComponent {
  id: string;
  __typename: 'ComponentUiBentoGrid';
  Title: string;
  Color?: string;
  orientation: string;
  BentoItems: {
    Items: Array<{
      id?: string;
      Imagem: MediaFile;
      Content: string;
    }>;
  };
}

export interface LinksGroupComponent {
  id: string;
  __typename: 'ComponentUiLinksGroup';
  links: Array<{
    id: string;
    linkTitle: string;
    page: {
      id: string;
      slug: string;
      Title: string;
      pageBanner: MediaFile;
      ParentPage?: {
        slug: string;
      };
    };
  }>;
}

export interface ContactsCarrouselComponent {
  id: string;
  __typename: 'ComponentUiContactsCarrousel';
  title: string;
  contacts: Array<{
    id: string;
    name: string;
    role: string;
    email: string;
    photo: MediaFile;
  }>;
}

export interface TreeComponent {
  id: string;
  __typename: 'ComponentUiTree';
  data: string;
}

/**
 * Get the correct CMS data path based on environment
 */
function getCmsPath(subPath: string): string {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const basePath = isDevelopment ? 'src/data/cms' : 'public/cms-data';
  return `${basePath}/${subPath}`;
}

/**
 * Load a page by slug from local JSON files
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const { readFile } = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), getCmsPath(`pages/${slug}.json`));
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading page ${slug}:`, error);
    return null;
  }
}

/**
 * Get all pages metadata
 */
export async function getAllPages(): Promise<PageData[]> {
  try {
    const { readdir, readFile } = await import('fs/promises');
    const path = await import('path');
    const pagesDir = path.join(process.cwd(), getCmsPath('pages'));
    
    const files = await readdir(pagesDir);
    const pages: PageData[] = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(pagesDir, file);
        const data = await readFile(filePath, 'utf-8');
        pages.push(JSON.parse(data));
      }
    }
    
    return pages;
  } catch (error) {
    console.error('Error loading pages:', error);
    return [];
  }
}

/**
 * Load footer configuration
 */
export async function getFooterData(): Promise<FooterData | null> {
  try {
    const { readFile } = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), getCmsPath('config/footer.json'));
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading footer:', error);
    return null;
  }
}

/**
 * Load navbar configuration
 */
export async function getNavbarData(): Promise<NavbarData | null> {
  try {
    const { readFile } = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), getCmsPath('config/navbar.json'));
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading navbar:', error);
    return null;
  }
}

/**
 * Load home page specific data
 */
export async function getHomeData(): Promise<any> {
  try {
    const { readFile } = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), getCmsPath('config/home.json'));
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading home:', error);
    return null;
  }
}

/**
 * Transform media URL to ensure it's absolute
 */
export function transformMediaUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return url;
  return `/cms-media/${url}`;
}

/**
 * Validate page data structure
 */
export function isValidPageData(data: any): data is PageData {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.Title === 'string' &&
    typeof data.slug === 'string' &&
    data.pageBanner &&
    Array.isArray(data.Content)
  );
}
