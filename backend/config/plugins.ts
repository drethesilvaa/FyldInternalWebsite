export default ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-azure-storage",
      providerOptions: {
        account: env("AZURE_STORAGE_ACCOUNT"),
        accountKey: env("AZURE_STORAGE_ACCOUNT_KEY"), // or SAS token
        serviceBaseURL: env("AZURE_STORAGE_BASEURL", undefined), // optional custom domain
        containerName: env("AZURE_STORAGE_CONTAINER", "uploads"),
        defaultPath: "assets",
        cdnBaseURL: env("AZURE_CDN_URL", undefined),
      },
    },
  },
});
