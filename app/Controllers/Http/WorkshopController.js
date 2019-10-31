"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use("App/Models/Workshop");

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
    return response.json(
      await Workshop.query()
        .with("users")
        .fetch()
    );
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
    try {
      const workshop = await Workshop.create(request.all());
      return response.json(workshop);
    } catch (error) {
      return response.json(error);
    }
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
    try {
      const workshop = await Workshop.find(params.id);
      await workshop.load("users");

      return response.json(workshop);
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Update workshop details.
   * PUT or PATCH workshops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const workshop = await Workshop.findOrFail(params.id);
      workshop.merge(request.all());

      return response.json({ success: await workshop.save() });
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Delete a workshop with id.
   * DELETE workshops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const workshop = await Workshop.findOrFail(params.id);

      return response.json({ success: await workshop.delete() });
    } catch (error) {
      return response.json(error);
    }
  }
}

module.exports = WorkshopController;
