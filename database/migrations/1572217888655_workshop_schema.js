"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class WorkshopSchema extends Schema {
  up() {
    this.create("workshops", table => {
      table.increments();
      table.string("name", 255);
      table.datetime("date");
      table.string("description", 255);
      table.timestamps();
    });
  }

  down() {
    this.drop("workshops");
  }
}

module.exports = WorkshopSchema;
