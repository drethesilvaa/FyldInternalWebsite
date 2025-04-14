import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql", // Change this to your Strapi backend URL
  cache: new InMemoryCache(),
});

export default client;
