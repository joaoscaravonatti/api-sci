"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')}  Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Person = use("App/Models/Person");

class PersonController {
  /**
   * List all User/Person
   * GET /people
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    try {
      const people = await Person.query()
        .with("user")
        .fetch();
      return response.json(people);
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Destroy a User/Person
   * DELETE /people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request, response }) {
    try {
      const user = await User.findOrFail(request.params.id);

      await user.person().delete();
      await user.delete();

      return response.json({ message: "Deleted" });
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Show a User/Person
   * GET /people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ request, response }) {
    // terminar
    try {
      return response.json(await Person.findOrFail(request.params.id));
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Store a new User/Person
   * POST /people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const {
      dateOfBirth: date_of_birth,
      email,
      name,
      password,
      username
    } = request.body;

    try {
      const { id: user_id } = await User.create({ username, email, password });
      const person = await Person.create({ name, date_of_birth, user_id });
      return response.json(person);
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Update a User/Person
   * PUT /people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async udpate({ request, response }) {}
}

module.exports = PersonController;
