export const GRAPHQL_ENDPOINT = `${process.env.STRAPI_URL}/graphql`;

export const GRAPHQL_HEADERS = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
};
