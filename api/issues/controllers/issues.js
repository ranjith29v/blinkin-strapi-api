"use strict";
const { sanitizeEntity } = require("strapi-utils");
var jwt = require("jsonwebtoken");
var jwt_secreat = require("../../../extensions/users-permissions/config/jwt");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
let token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1OSwibmFtZSI6IlJhbmppdGgiLCJlbWFpbCI6InJhbmppdGgudkBibGlua2luLmlvIiwiY29tcGFueV9pZCI6MSwibGFzdF9sb2dpbl9hdCI6IjIwMjAtMDYtMTIgMDc6MzA6MDYiLCJzZXNzaW9uX2lkIjoiYWVKenZHWWtTRUFnRGpvWFRMUndRcjlwUHVDdkpUcTNRS0d4bml5ZGJQNUN5bHRnSmNRYWZ6eXVGUVhMIiwiY291bnRyeSI6IklOIiwiZXhwaXJ5IjoxNTkzMTU2NjA2LCJpc19jb21wYW55X2FkbWluIjp0cnVlfQ.cMK7BPyvQeCxPyelTAlzR1L7btmCdcI4zky5tKy9neE";

function authticate(token) {}

module.exports = {
  async find(ctx) {
    console.log(ctx.request);
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.issues.search(ctx.query);
    } else {
      entities = await strapi.services.issues.find(ctx.query);
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.issues })
    );
    // return await strapi.services.issues.find(ctx.query);
  }
};
