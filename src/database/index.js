import { Sequelize } from 'sequelize'
import { databaseSettings } from '../config'
import { User, UserActivation, UserSession } from './models'

const sequelize = new Sequelize(databaseSettings)

User.init(sequelize)
UserActivation.init(sequelize)
UserSession.init(sequelize)

console.log(`Database '${databaseSettings.host}' has been connected`);

export  { 
  sequelize,
  User,
  UserActivation,
  UserSession
}
