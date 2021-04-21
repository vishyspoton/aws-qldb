const { qldbConnect, Ledger, DataTypes } = require("qldb-serialiser");

const AssetModel = {
  assetId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    index: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    index: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  hideOwner: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false,
  },
  hidePrice: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false,
  },
};

module.exports = {
  AssetModel,
};
