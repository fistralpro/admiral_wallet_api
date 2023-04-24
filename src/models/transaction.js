const { sequelize, DataTypes } = require('../config/db');
const Wallet = require('./wallet');

const Transaction = sequelize.define(
  'transactionx',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: 'transactionx',
    hooks: {
      beforeCreate: async (transactionx, options) => {
        // Stop race condition
        const t = await sequelize.transaction();
        try {
          const wallet = await Wallet.findByPk(transactionx.walletId, { transaction: t, lock: true });
          const transactionAmount = parseFloat(transactionx.amount);
          const transactionAmountNum = Number(transactionAmount.toFixed(2));
          const newbalance = (Number(wallet.balance) + transactionAmountNum).toFixed(2);

          if (newbalance < 0) {
            throw new Error('Insufficient funds');
          }
          await Wallet.update(
            { balance: newbalance },
            { where: { id: transactionx.walletId }, transaction: t }
          );
          transactionx.balance = newbalance;
          await t.commit();
        } catch (error) {
          await t.rollback();
          throw error;
        }
      },
    },
  }
);

module.exports = Transaction;
