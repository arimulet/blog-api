import { DataTypes, Model } from 'sequelize'

class UserActivation extends  Model {
  static init = (sequelize) => {
    super.init({
      hash: {
        type: DataTypes.STRING,
        allowNull: false        
      },
      user_email:   {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      activated: {
        type: DataTypes.BOOLEAN,
        allowNull: false      
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      activationAt: { 
        type: DataTypes.DATE,
        allowNull: true
      }      
    }, {
      sequelize,
      modelName: 'UsersActivations',
      updatedAt: 'activationAt'
    })
  }  
}

export default UserActivation
