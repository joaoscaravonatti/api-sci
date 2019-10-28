"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

class UserSeeder {
  async run() {
    const users = [
      {
        username: "Jotadog",
        email: "jvscaravonatti@gmail.com",
        name: "Joao",
        password: "123",
        role_id: 2
      },
      {
        username: "Funetsu",
        email: "marcos.kropp@gmail.com",
        name: "Marcos",
        password: "123",
        role_id: 2
      },
      {
        username: "Baiano",
        email: "luanbahia@gmail.com",
        name: "Luan",
        password: "123",
        role_id: 2
      }
    ];

    await User.createMany(users);
  }
}

module.exports = UserSeeder;
