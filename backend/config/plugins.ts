// backend/config/plugins.js
module.exports = ({ env }) => {
  // Read from both naming styles to avoid surprises
  const account = env("AZURE_STORAGE_ACCOUNT") || env("AZURE_ACCOUNT");
  const accountKey =
    env("AZURE_STORAGE_ACCOUNT_KEY") || env("AZURE_ACCOUNT_KEY");
  const sasToken = env("AZURE_STORAGE_SAS_TOKEN") || env("AZURE_SAS_TOKEN"); // include leading "?" if present
  const containerName =
    env("AZURE_STORAGE_CONTAINER") || env("AZURE_CONTAINER") || "uploads";
  const cdnBaseURL = env("AZURE_CDN_URL") || env("CDN_URL");
  const serviceBaseURL = env("AZURE_STORAGE_BASEURL"); // leave undefined unless you use a custom domain

  // Temporary visibility to confirm values are present (remove after it works)
  console.log("[upload:azure] resolved options", {
    account,
    hasAccountKey: !!accountKey,
    hasSasToken: !!sasToken,
    containerName,
    cdnBaseURL: !!cdnBaseURL,
    serviceBaseURL: !!serviceBaseURL,
  });

  // Pass ONLY one credential type to the provider
  const credentials = sasToken
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
