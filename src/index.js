require("dotenv").config();
const { qldbConnect } = require("qldb-serialiser");
const { AssetQueryHelper } = require("./asset");

const qldbSettings = {
  maxConcurrentTransactions: 10,
  retryLimit: 4,
  region: process.env.AWS_REGION, // AWS Region
  sslEnabled: true,
};

// LedgerName
const qldb = new qldbConnect(process.env.QLDB_LEDGER_NAME, qldbSettings);

async function test() {
  const assetQueryHelper = new AssetQueryHelper(qldb);
  await assetQueryHelper.init();
  console.log("Database has been connected");

  const assetId = `${Date.now()}`;

  console.log("Creating an entry of asset");
  const res = await assetQueryHelper.createAsset({
    assetId,
    title: "Lorem Ipsum",
    description: "A quick brown fox jumps over a lazy dog",
    price: Math.random() * 1000,
    hideOwner: true,
  });
  console.log("Asset created with ID: ", assetId, res);

  console.log("Querying asset by ID: ", assetId);
  const assetInfo = await assetQueryHelper.getAssetById(assetId);
  console.log(assetInfo);

  await assetQueryHelper.dropTable();
  console.log("Assets table dropped");

  const tableHistory = await assetQueryHelper.getTableHistory();
  console.log("Table History: ", tableHistory);
}

test().catch((err) => {
  console.log(err);
});
