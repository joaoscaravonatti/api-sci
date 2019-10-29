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

Route.resource("users", "UserController")
  .apiOnly()
  .middleware("auth");

Route.resource("workshops", "WorkshopController").apiOnly();

Route.get("/roles", "RoleController.index");

Route.group(() => {
  Route.post("/users", "WorkshopController.subscribeUser");
  Route.delete(
    ":idWorkshop/users/:idUser",
    "WorkshopController.unsubscribeUser"
  );
}).prefix("workshops");

Route.post("/login", "AuthController.login");
Route.get("/check", "AuthController.check");
