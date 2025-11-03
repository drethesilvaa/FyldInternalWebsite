export default ({ env }) => ({
  host: "0.0.0.0",
  port: env.int("PORT", 8080),
  url: env("PUBLIC_URL"),
  proxy: true,
  app: {
    keys: env.array("APP_KEYS"),
  },
  cron: { enabled: env.bool("CRON_ENABLED", false) }, // ensure false during transfer
});
