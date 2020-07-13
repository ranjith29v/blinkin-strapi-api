"use strict";
const { sanitizeEntity } = require("strapi-utils");
var jwt = require("jsonwebtoken");
var jwt_secreat = require("../../../extensions/users-permissions/config/jwt");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const { company_id } = await strapi.plugins[
      "users-permissions"
    ].services.jwt.getToken(ctx);
    ctx.query["company_name"] = company_id;
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.issues.search(ctx.query);
    } else {
      entities = await strapi.services.issues.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.issues })
    );
  },
};

module.exports = {
  async create(ctx) {
    const { company_id } = await strapi.plugins[
      "users-permissions"
    ].services.jwt.getToken(ctx);
    ctx.request.body["company_name"] = company_id;
    let entity;
    entity = await strapi.services.issues.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.issues });
  },
};
