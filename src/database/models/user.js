import { DataTypes, Model } from 'sequelize'

class User extends  Model {
  static init = (sequelize) => {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: { 
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'User'
    })
  }  
}

export default User
