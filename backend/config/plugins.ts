module.exports = ({ env }) => {
  const connectionString = env("AZURE_STORAGE_CONNECTION_STRING");
  const account = env("AZURE_STORAGE_ACCOUNT") || env("AZURE_ACCOUNT");
  const accountKey =
    env("AZURE_STORAGE_ACCOUNT_KEY") || env("AZURE_ACCOUNT_KEY");
  const sasToken = env("AZURE_STORAGE_SAS_TOKEN") || env("AZURE_SAS_TOKEN");
  const containerName =
    env("AZURE_STORAGE_CONTAINER") || env("AZURE_CONTAINER") || "uploads";
  const cdnBaseURL = env("AZURE_CDN_URL") || env("CDN_URL");
  const serviceBaseURL = env("AZURE_STORAGE_BASEURL");

  console.log("[upload:azure] resolved options", {
    hasConnStr: !!connectionString,
    account,
    hasAccountKey: !!accountKey,
    hasSasToken: !!sasToken,
    containerName,
  });

  const credentials = connectionString
    ? { connectionString }
    : sasToken
      ? { sasToken }
      : accountKey
        ? { accountKey }
        : {};

  return {
    upload: {
      config: {
        provider: "strapi-provider-upload-azure-storage",
        providerOptions: {
          account,
          containerName,
          defaultPath: "assets",
          cdnBaseURL,
          serviceBaseURL,
          ...credentials,
        },
      },
    },
  };
};
