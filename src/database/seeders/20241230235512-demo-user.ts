'use strict';

import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'


dotenv.config()
const saltRounds = Number(process.env.SALTROUNDS)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          userId: uuidv4(),
          firstName: 'Jessie',
          lastName: 'Umuhire',
          email: 'umuhirejessie@gmail.com',
          password: await bcrypt.hash('123@Pass', saltRounds),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
