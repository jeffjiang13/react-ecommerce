module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://react-ecommerce-7d0j.onrender.com/'), // Replace with your Strapi backend URL
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'TpEVAHJKo0jq8Wfz69g5Qg=='), // Replace with your JWT secret
    },
    url: '/admin',
    serveAdminPanel: env('SERVE_ADMIN_PANEL', true),
  },
  public: {
    path: './public',
    maxAge: 60000,
  },
});
