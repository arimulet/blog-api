
import { DataTypes, Model } from 'sequelize'

class UserSession extends  Model {
  static init = (sequelize) => {
    super.init({
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      userId:   {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'UserSessions',
      updatedAt: false
    })
  }  
}

export default UserSession
