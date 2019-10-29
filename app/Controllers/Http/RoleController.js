"use strict";

const Role = use("App/Models/Role");

class RoleController {
  async index({ response }) {
    return response.json(await Role.all());
  }
}

module.exports = RoleController;
