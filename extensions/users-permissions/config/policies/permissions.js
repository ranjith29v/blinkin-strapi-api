const _ = require("lodash");

module.exports = async (ctx, next) => {
  let role;

  if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
    try {
      const val = await strapi.plugins[
        "users-permissions"
      ].services.jwt.getToken(ctx);

      if (new Date(val.expiry * 1000) > new Date()) {
        return await next();
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
