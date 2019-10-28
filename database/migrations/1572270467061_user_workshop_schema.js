"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsersWorkshopsSchema extends Schema {
  up() {
    this.create("user_workshop", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table
        .integer("workshop_id")
        .unsigned()
        .references("id")
        .inTable("workshops");
      table.timestamps();
    });
  }

  down() {
    this.drop("user_workshop");
  }
}

module.exports = UsersWorkshopsSchema;
