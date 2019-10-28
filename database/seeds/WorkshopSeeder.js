"use strict";

/*
|--------------------------------------------------------------------------
| WorkshopSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Workshop = use("App/Models/Workshop");

class WorkshopSeeder {
  async run() {
    await Workshop.createMany([
      {
        name: "Curso React",
        date: "2019-10-20 13:30:00",
        description: "Integração de React com API Rest"
      },
      {
        name: "Curso Adonis",
        date: "2019-10-20 13:30:00",
        description: "API Rest com AdonisJS"
      }
    ]);
  }
}

module.exports = WorkshopSeeder;
