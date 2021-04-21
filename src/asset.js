const { Ledger } = require("qldb-serialiser");
const { BaseQueryHelper } = require("./base");
const { AssetModel } = require("./models/asset.model");

class AssetQueryHelper extends BaseQueryHelper {
  constructor(qldb, tableName = "assets") {
    super(qldb, tableName);
    this.assetModel = new Ledger(qldb, tableName, AssetModel, {
      timestamps: true,
    });
    this.tableName = tableName;
    this.initialized = false;
  }

  async init() {
    await super.init();
    const tableExists = await this.tableExists(this.tableName);
    if (!tableExists) {
      await this.createTable(this.tableName);
    }

    this.initialized = true;
  }

  async createAsset(asset) {
    if (!this.initialized) {
      return false;
    }

    let assetResult = await this.assetModel.add(asset);
    if (assetResult) return assetResult;
    return false;
  }

  async getAssetById(assetId) {
    if (!this.initialized) {
      return false;
    }

    let assetResult = await this.assetModel.getByPk(assetId);
    if (assetResult) return assetResult;
    return false;
  }

  async getTableHistory() {
    const tableIds = await super.getTableId(this.tableName);
    const { tableId: latestTableId } = tableIds[tableIds.length - 1];
    return super.getTableHistory(latestTableId);
  }
}

module.exports = {
  AssetQueryHelper,
};
