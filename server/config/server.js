module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://react-ecommerce-7d0j.onrender.com'), // Replace with your Strapi backend URL
  app: {
    keys: ['quhWaobvedEPBqW23JoyLA==', 'JXadhLq+9Qu/N2Er9g0ecw=='], // Add your unique keys here
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'g6cfxRQ+bFT8MFAuqGGUhA=='), // Replace with your JWT secret
    },
    url: '/admin',
    serveAdminPanel: env('SERVE_ADMIN_PANEL', true),
  },
  public: {
    path: './public',
    maxAge: 60000,
  },
});
