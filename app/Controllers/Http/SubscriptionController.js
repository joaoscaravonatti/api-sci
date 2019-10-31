"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use("App/Models/Workshop");

class SubscriptionController {
  /**
   * Subscribe the user to workshops
   * POST /subscribe
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async subscribe({ auth, request, response }) {
    try {
      const user = await auth.getUser();
      const res = await user.workshops().attach(request.body.workshopIds);

      return response.json({ success: res.length });
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * Unsubscribe the user from workshops
   * POST /unsubscribe
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async unsubscribe({ auth, request, response }) {
    try {
      const user = await auth.getUser();
      const res = await user.workshops().detach(request.body.workshopIds);

      return response.json({ success: res });
    } catch (error) {
      return response.json(error);
    }
  }

  /**
   * List all subscriptions with the user subscritpions checked
   * GET /subscriptions
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async getSubscriptions({ auth, response }) {
    const user = await auth.getUser();

    await user.load("workshops");

    const workshops = await Workshop.all();

    const userWorkshops = await user.workshops().fetch();

    const serializedWorkshps = [...workshops.toJSON()];
    const serializedUserWorkshps = [...userWorkshops.toJSON()];

    const finalArray = serializedWorkshps.map(workshop => ({
      ...workshop,
      subscribed: false
    }));

    for (let [index, workshop] of finalArray.entries()) {
      for (let userWorkshop of serializedUserWorkshps) {
        if (workshop.id === userWorkshop.id) {
          finalArray[index].subscribed = true;
        }
      }
    }

    return response.json(finalArray);
  }
}

module.exports = SubscriptionController;
