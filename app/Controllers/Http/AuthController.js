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
    return response.json({ token });
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
}

module.exports = AuthController;
