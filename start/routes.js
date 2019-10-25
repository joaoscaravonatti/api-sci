"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Route.post("/people", "PersonController.store");
// Route.get("/people", "PersonController.index");
// Route.delete("/people/:id", "PersonController.destroy");
// Route.get("/people/:id", "PersonController.show");
// Route.put("/people/:id", "PersonController.update");

Route.resource("people", "PersonController").apiOnly();
