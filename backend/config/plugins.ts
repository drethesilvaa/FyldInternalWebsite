module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-azure-storage",
      providerOptions: {
        account: env("AZURE_STORAGE_ACCOUNT"), // map to your current var
        accountKey: env("AZURE_STORAGE_ACCOUNT_KEY"), // or sasToken: env('AZURE_STORAGE_SAS_TOKEN')
        containerName: env("AZURE_STORAGE_CONTAINER", "uploads"),
        defaultPath: "assets",
        cdnBaseURL: env("AZURE_CDN_URL"),
        serviceBaseURL: env("AZURE_STORAGE_BASEURL"),
      },
    },
  },
});
