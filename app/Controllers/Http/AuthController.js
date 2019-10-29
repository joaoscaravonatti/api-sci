"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

class AuthController {
  /**
   * Login
   * POST login
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login({ auth, request, response }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return response.json(token);
  }

  /**
   * Logout
   * POST logout
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   */
  async logout({ auth }) {
    await auth.logout();
  }

  /**
   * Check if JWT Token is valid
   * GET check
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async check({ auth, response }) {
    try {
      return response.json(await auth.check());
    } catch (error) {
      return response.json(false);
    }
  }
}

module.exports = AuthController;
