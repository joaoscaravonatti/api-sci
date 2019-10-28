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
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("workshop_id")
        .unsigned()
        .references("id")
        .inTable("workshops")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("user_workshop");
  }
}

module.exports = UsersWorkshopsSchema;
