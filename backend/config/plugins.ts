// Strapi v5 style
export default ({ env }) => ({
  upload: {
    config: {
      provider: "azure-storage", // or the TS variant from the Market
      providerOptions: {
        // If using connection string:
        connectionString: env("AZURE_STORAGE_CONNECTION_STRING"),
        // Or, if using account/key (do not set connectionString at the same time):
        // account: env('AZURE_STORAGE_ACCOUNT'),
        // accountKey: env('AZURE_STORAGE_ACCOUNT_KEY'),
        containerName: env("AZURE_STORAGE_CONTAINER", "hr-internal-website"),
        // optional: basePath, cdnBaseUrl, etc.
      },
    },
  },
});
