"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsersWorkshopsSchema extends Schema {
  up() {
    this.create("users_workshops", table => {
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
    this.drop("users_workshops");
  }
}

module.exports = UsersWorkshopsSchema;
