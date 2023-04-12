module.exports = ({ env }) => ({
  url: 'https://react-ecommerce-7d0j.onrender.com', // Replace with your Strapi backend URL
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
});
