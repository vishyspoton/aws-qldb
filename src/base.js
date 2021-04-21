const { qldbConnect } = require("qldb-serialiser");

class BaseQueryHelper {
  /**
   * 
   * @param {qldbConnect} qldb 
   */
  constructor(qldb) {
    this.qldb = qldb;
  }

  async init() {
    return this.qldb.getSession();
  }

  async createTable(tableName) {
    return this.qldb.executeRawSQL(`CREATE TABLE ${tableName}`);
  }

  async dropTable(tableName) {
    return this.qldb.executeRawSQL(`DROP TABLE ${tableName}`);
  }

  async tableExists(tableName) {
    const tableNames = await this.qldb.getTableNames();
    return tableNames.includes(tableName);
  }

  async getTableId(tableName) {
    return this.qldb.executeRawSQL(
      `SELECT tableId FROM information_schema.user_tables WHERE name = '${tableName}'`
    );
  }

  async getTableHistory(tableId) {
    return this.qldb.executeRawSQL(`SELECT * FROM history('${tableId}')`);
  }
}

module.exports = {
  BaseQueryHelper,
};
