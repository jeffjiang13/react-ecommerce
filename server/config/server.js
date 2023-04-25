module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1335),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "8431c625cac94e7ef8143372f074f507"),
    },
  },
});
