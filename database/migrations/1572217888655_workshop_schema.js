"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class WorkshopSchema extends Schema {
  up() {
    this.create("workshops", table => {
      table.increments();
      table.string("title", 255);
      table.string("description", 255);
      table.string("place", 255);
      table.datetime("startDate");
      table.datetime("endDate");
      table.timestamps();
    });
  }

  down() {
    this.drop("workshops");
  }
}

module.exports = WorkshopSchema;
