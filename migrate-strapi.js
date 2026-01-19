#!/usr/bin/env node
/**
 * Strapi Data Migration Script - Simplified
 * Pulls all data from Strapi REST API
 * and saves it to JSON files for local usage
 */

const fs = require("fs");
const path = require("path");

// Configuration
const STRAPI_URL = "https://fyldinternalwebsitestrapi.onrender.com";
const TRANSFER_TOKEN =
  "eb6161c09cd5b002a40cd5d1f0be48a3c090a94c40e2c3efdc9a5761482e80c5042d693cb7a6212324dcf412ff01a405ee63e7e7b749664990a1df623d5e1aa6a9395dd7ea1bd27298004ec983b6dd16f1a85afbe69964dfda81dbbcaa81279c5b07dfae85d50a0ac44b71e2a458b87d7f8f9aa005560b800da956b8f363ce2e";

if (!TRANSFER_TOKEN) {
  console.error(
    "Error: STRAPI_TRANSFER_TOKEN environment variable is not set."
  );
  process.exit(1);
}

const GRAPHQL_HEADERS = {
  "Content-Type": "application/json",
};

// Directories for storing data
const DATA_DIR = path.join(__dirname, "frontend/src/data/cms");
const PAGES_DIR = path.join(DATA_DIR, "pages");
const CONFIG_DIR = path.join(DATA_DIR, "config");
const MEDIA_DIR = path.join(__dirname, "frontend/public/cms-media");

// Create directories if they don't exist
[DATA_DIR, PAGES_DIR, CONFIG_DIR, MEDIA_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Save data to JSON file
 */
function saveData(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`  ✓ Saved: ${filename}`);
}

/**
 * Save page to JSON file
 */
function savePage(slug, data) {
  const filename = `${slug}.json`;
  const filePath = path.join(PAGES_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`  ✓ Saved page: ${slug}`);
}

/**
 * Extract all image URLs from data
 */
function extractImageUrls(data, urls = new Set()) {
  if (typeof data !== "object" || data === null) {
    return urls;
  }

  if (Array.isArray(data)) {
    data.forEach((item) => extractImageUrls(item, urls));
  } else {
    Object.keys(data).forEach((key) => {
      const value = data[key];

      if (key === "url" && typeof value === "string" && (value.includes("cloudinary") || value.includes("strapiapp"))) {
        urls.add(value);
      } else if (typeof value === "object") {
        extractImageUrls(value, urls);
      }
    });
  }

  return urls;
}

/**
 * Download image from URL and save locally
 */
async function downloadImage(imageUrl) {
  try {
    const urlObj = new URL(imageUrl);
    const filename = path.basename(urlObj.pathname);
    const filepath = path.join(MEDIA_DIR, filename);

    // Skip if already downloaded
    if (fs.existsSync(filepath)) {
      return { originalUrl: imageUrl, localPath: `/cms-media/${filename}` };
    }

    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.warn(`  ⚠ Failed to download: ${filename}`);
      return { originalUrl: imageUrl, localPath: imageUrl };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);
    console.log(`  ✓ Downloaded: ${filename}`);

    return { originalUrl: imageUrl, localPath: `/cms-media/${filename}` };
  } catch (error) {
    console.warn(`  ⚠ Error downloading image: ${error.message}`);
    return { originalUrl: imageUrl, localPath: imageUrl };
  }
}

/**
 * Replace image URLs with local paths in data
 */
function replaceImageUrls(data, urlMap) {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => replaceImageUrls(item, urlMap));
  } else {
    const newData = {};
    Object.keys(data).forEach((key) => {
      const value = data[key];

      if (key === "url" && typeof value === "string" && urlMap[value]) {
        newData[key] = urlMap[value];
      } else if (typeof value === "object") {
        newData[key] = replaceImageUrls(value, urlMap);
      } else {
        newData[key] = value;
      }
    });
    return newData;
  }
}

/**
 * Fetch data from Strapi REST API
 */
async function fetchFromStrapiREST(endpoint) {
  try {
    // Build specific populate paths instead of using wildcard with additional paths
    let url = `${STRAPI_URL}/api/${endpoint}?pagination[pageSize]=100`;
    
    if (endpoint === "pages") {
      // For pages, get all fields including nested component data
      url += "&populate=pageBanner&populate=Content&populate=Content.items&populate=Content.items.Items&populate=Content.items.Items.Imagem&populate=Content.Item&populate=Content.Item.Imagem&populate=Content.Items&populate=Content.Items.Imagem&populate=Content.Imagem&populate=Content.contacts&populate=Content.contacts.photo&populate=ParentPage";
    } else if (endpoint === "home") {
      url += "&populate=placeholderImage&populate=FyldIcon&populate=Empresa&populate=Empresa.Item&populate=Empresa.Item.Imagem&populate=TyFyld&populate=TyFyld.Items&populate=TyFyld.Items.Imagem&populate=ParteDaFyld&populate=ParteDaFyld.Items&populate=ParteDaFyld.Items.Imagem";
    } else if (endpoint === "footer") {
      url += "&populate=SocialLinks";
    } else if (endpoint === "navbar") {
      url += "&populate=logo&populate=menuItems&populate=menuItems.page";
    } else {
      url += "&populate=*";
    }
    
    const response = await fetch(url, {
      headers: GRAPHQL_HEADERS,
    });

    if (!response.ok) {
      console.warn(`  ⚠ HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`  ✗ Error fetching ${endpoint}: ${error.message}`);
    return null;
  }
}

/**
 * Fetch data from Strapi GraphQL API
 */
async function fetchFromStrapi(query) {
  try {
    const response = await fetch(`${STRAPI_URL}/graphql`, {
      method: "POST",
      headers: GRAPHQL_HEADERS,
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.warn(`  ⚠ HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (data.errors) {
      console.warn(`  ⚠ GraphQL errors:`, data.errors);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error(`  ✗ Error fetching: ${error.message}`);
    return null;
  }
}

/**
 * Main migration function
 */
async function migrate() {
  console.log("=".repeat(60));
  console.log("Strapi Data Migration Starting...");
  console.log("=".repeat(60));
  console.log(`Strapi URL: ${STRAPI_URL}\n`);

  try {
    // 1. Fetch all pages using REST API with deep populate
    console.log("[1/4] Fetching all pages with full content...");
    const pagesResult = await fetchFromStrapiREST("pages");
    
    if (!pagesResult || !pagesResult.data) {
      throw new Error("Failed to fetch pages from Strapi");
    }

    const pages = pagesResult.data;
    console.log(`✓ Found ${pages.length} pages\n`);

    // Save each page
    pages.forEach((page) => {
      const cleanPage = {
        documentId: page.documentId,
        Title: page.Title || "",
        slug: page.slug || "",
        pageBanner: page.pageBanner || null,
        Content: page.Content || [],
        ParentPage: page.ParentPage || null,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
      };

      savePage(cleanPage.slug, cleanPage);
    });

    // 2. Fetch footer
    console.log("\n[2/4] Fetching footer...");
    const footerResult = await fetchFromStrapiREST("footer");
    
    if (footerResult && footerResult.data) {
      const footer = footerResult.data;
      const cleanFooter = {
        documentId: footer.documentId,
        address: footer.address || "",
        SocialLinks: footer.SocialLinks || [],
      };
      saveData("config/footer.json", cleanFooter);
      console.log("✓ Saved footer\n");
    } else {
      console.log("⚠ Footer not found\n");
    }

    // 3. Fetch home
    console.log("[3/4] Fetching home...");
    const homeResult = await fetchFromStrapiREST("home");
    
    if (homeResult && homeResult.data) {
      const home = homeResult.data;
      const cleanHome = {
        documentId: home.documentId,
        VideoLink: home.VideoLink || "",
        placeholderImage: home.placeholderImage || null,
        FyldIcon: home.FyldIcon || null,
        Empresa: home.Empresa || [],
        TyFyld: home.TyFyld || [],
        ParteDaFyld: home.ParteDaFyld || [],
      };
      saveData("config/home.json", cleanHome);
      console.log("✓ Saved home\n");
    } else {
      console.log("⚠ Home not found\n");
    }

    // 4. Fetch navbar
    console.log("[4/4] Fetching navbar...");
    const navbarResult = await fetchFromStrapiREST("navbar");
    
    if (navbarResult && navbarResult.data) {
      const navbar = navbarResult.data;
      const cleanNavbar = {
        documentId: navbar.documentId,
        logo: navbar.logo || null,
        menuItems: navbar.menuItems || [],
      };
      saveData("config/navbar.json", cleanNavbar);
      console.log("✓ Saved navbar\n");
    } else {
      console.log("⚠ Navbar not found\n");
    }

    console.log("=".repeat(60));
    console.log("✓ Migration completed successfully!");
    console.log("=".repeat(60));

    // Now download all images
    console.log("\n[Bonus] Downloading all images...");
    const allImageUrls = new Set();

    // Collect URLs from all pages
    pages.forEach((page) => {
      extractImageUrls(page, allImageUrls);
    });

    // Collect URLs from config files
    if (footerResult && footerResult.data) {
      extractImageUrls(footerResult.data, allImageUrls);
    }
    if (homeResult && homeResult.data) {
      extractImageUrls(homeResult.data, allImageUrls);
    }
    if (navbarResult && navbarResult.data) {
      extractImageUrls(navbarResult.data, allImageUrls);
    }

    console.log(`Found ${allImageUrls.size} unique images to download...\n`);

    // Download all images
    const urlMap = {};
    for (const imageUrl of allImageUrls) {
      const result = await downloadImage(imageUrl);
      urlMap[result.originalUrl] = result.localPath;
    }

    // Replace URLs in all saved files
    console.log("\nUpdating file references to use local paths...");

    // Update pages
    pages.forEach((page) => {
      const filepath = path.join(PAGES_DIR, `${page.slug}.json`);
      let content = fs.readFileSync(filepath, "utf-8");
      let data = JSON.parse(content);
      data = replaceImageUrls(data, urlMap);
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    });
    console.log(`  ✓ Updated ${pages.length} pages`);

    // Update footer
    const footerPath = path.join(CONFIG_DIR, "footer.json");
    if (fs.existsSync(footerPath)) {
      let footerContent = fs.readFileSync(footerPath, "utf-8");
      let footerData = JSON.parse(footerContent);
      footerData = replaceImageUrls(footerData, urlMap);
      fs.writeFileSync(footerPath, JSON.stringify(footerData, null, 2));
      console.log(`  ✓ Updated footer`);
    }

    // Update home
    const homePath = path.join(CONFIG_DIR, "home.json");
    if (fs.existsSync(homePath)) {
      let homeContent = fs.readFileSync(homePath, "utf-8");
      let homeData = JSON.parse(homeContent);
      homeData = replaceImageUrls(homeData, urlMap);
      fs.writeFileSync(homePath, JSON.stringify(homeData, null, 2));
      console.log(`  ✓ Updated home`);
    }

    // Update navbar
    const navbarPath = path.join(CONFIG_DIR, "navbar.json");
    if (fs.existsSync(navbarPath)) {
      let navbarContent = fs.readFileSync(navbarPath, "utf-8");
      let navbarData = JSON.parse(navbarContent);
      navbarData = replaceImageUrls(navbarData, urlMap);
      fs.writeFileSync(navbarPath, JSON.stringify(navbarData, null, 2));
      console.log(`  ✓ Updated navbar`);
    }

    console.log("\n" + "=".repeat(60));
    console.log("✓ All images downloaded and references updated!");
    console.log("=".repeat(60));
  } catch (error) {
    console.error("\n✗ Migration failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run migration
migrate();
