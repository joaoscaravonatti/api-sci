"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    return response.json(
      await User.query()
        .with("role")
        .fetch()
    );
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const user = await User.create(request.all());
      return response.json(user);
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    try {
      const user = await User.find(params.id);
      await user.load("role");
      return response.json(user);
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);
      user.merge(request.all());
      return response.json({ success: await user.save() });
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);
      return response.json({ success: await user.delete() });
    } catch (error) {
      return response.json(error);
    }
  }
}

module.exports = UserController;
