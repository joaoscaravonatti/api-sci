"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use("App/Models/Workshop");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with workshops
 */
class WorkshopController {
  /**
   * Show a list of all workshops.
   * GET workshops
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    return response.json(await Workshop.all());
  }

  /**
   * Create/save a new workshop.
   * POST workshops
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const workshop = await Workshop.create(request.all());
    return response.json(workshop);
  }

  /**
   * Display a single workshop.
   * GET workshops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    const workshop = await Workshop.find(params.id);
    workshop.users = await workshop.users().fetch();

    return response.json(workshop);
  }

  /**
   * Update workshop details.
   * PUT or PATCH workshops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a workshop with id.
   * DELETE workshops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  /**
   * Subscribe user to a workshop
   * POST workshops/:id/users/
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async subscribeUser({ request, response }) {
    const workshopId = request.body.workshopId;
    const userId = request.body.userId;

    const workshop = await Workshop.find(workshopId);
    const user = await User.find(userId);

    await workshop.users().save(user);

    return response.json(true);
  }
}

module.exports = WorkshopController;
