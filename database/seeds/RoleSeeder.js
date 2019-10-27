"use strict";

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use("App/Models/Role");

class RoleSeeder {
  async run() {
    const roles = [
      {
        name: "Teacher"
      },
      {
        name: "Student"
      }
    ];

    await Role.createMany(roles);
  }
}

module.exports = RoleSeeder;
