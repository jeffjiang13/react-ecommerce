module.exports = {
  load: {
    before: [
      'strapi::errors',
      'strapi::security',
      'strapi::cors',
      'strapi::poweredBy',
      'strapi::logger',
      'strapi::query',
      'strapi::body',
      'strapi::session',
      'strapi::favicon',
    ],
    after: [
      {
        name: 'strapi::public',
        config: {
          path: './public',
          maxAge: 60000,
        },
      },
    ],
  },
};
