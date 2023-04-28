"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email, userId } = ctx.request.body;
    console.log("Received userId:", userId);

    try {
      // retrieve item information
      const lineItems = await Promise.all(
        products.map(async (product) => {
          try {
            const item = await strapi
              .service("api::item.item")
              .findOne(product.id);

            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price * 100,
              },
              quantity: product.count,
            };
          } catch (error) {
            ctx.response.status = 500;
            return {
              error: { message: `Error retrieving product with ID: ${product.id}` },
            };
          }
        })
      );

      // create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "https://jj-react-ecommerce.vercel.app/checkout/success",
        cancel_url: "https://jj-react-ecommerce.vercel.app",
        line_items: lineItems,
      });

      // Find the user instance
      try {
        const user = await strapi.plugins['users-permissions'].services.user.fetch({ id: userId });

        // create the order
        await strapi
          .service("api::order.order")
          .create({ data: { userName, products, stripeSessionId: session.id, user } });

        // return the session id
        return { id: session.id };
      } catch (error) {
        ctx.response.status = 500;
        return { error: { message: `Error fetching user with ID: ${userId}` } };
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      ctx.response.status = 500;
      return { error: { message: "An unexpected error occurred" } };
    }
  },
}));
