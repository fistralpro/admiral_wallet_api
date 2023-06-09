const {sequelize, DataTypes} = require('../config/db')
// TODO: Return ID as string (use conversion.obfuscateString)
// TODO: can we validate in here for not entering a createdDate?
// TODO: cam we stop the creation of a passed in id
// TODO: would this be better as a model type?
const Wallet = sequelize.define('wallet', 
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0, 
            }
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        createdDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false, 
        tableName: 'wallet'
    });

    module.exports = Wallet;