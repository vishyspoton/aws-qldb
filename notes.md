# Notes

Amazon Quantum Ledger Database (Amazon QLDB) is a fully managed ledger database that provides a transparent, immutable, and cryptographically verifiable transaction log owned by a central trusted authority. With QLDB, each db operation(`CREATE`, `UPDATE`, `DELETE`) is recorded in an immutable journal -- the journal history as such cannot be altered, updated, or deleted.

Each change to the journal is recorded in a block, along with cryptographically verifiable proofs. This block has metadata representing the changes to the database, the timestamp at which the changes were committed, an entriesHash corr. to all of the entries within the block and a blockHash. The blockHash is comprised of the hash representation of `entriesHash` and `previousBlockHash`.

All revisions of a document that were inserted, updated, and deleted, can be queried via a history API. The history metadata shows exactly when each revision was made, in what order, and which transaction committed them. Using the history API, one can can efficiently verify the integrity of a document in ledger's journal by using cryptographic hashing with SHA-256.

In addition to the history API, the journal logs can be streamed realtime to an S3 bucket or to an HTTP Endpoint or to a AWS Lambda. These logs can also be exported using the `Export` functionality on the AWS console.

Amazon QLDB also provides actions to create, manage a stream of journal data from the ledger to Amazon Kinesis Data Streams. The QLDB stream captures every document revision that is committed to your journal and sends it to a Kinesis data stream.

# Points to be noted

- Each QLDB session can only have 1 active transaction(db write). And a max. of 1500 concurrent db sessions can be maintained to achieve max throughput.
- QLDB seems to be good for data integrity related guarantees and uses an SQL like syntax to update records in the db. However, it is pretty inefficient for querying data over non-indexed db fields or for doing full table scans with filters(for e.g., generating a monthly statement of all crypto transactions for an account in a month time frame).

    To cater these scenarios, of acheiving faster reads from the db and to support better filtering of db data, a data replica comprising of all the cumulative changes to QLDB needs to be maintained in elastic search or any traditional db.

    [Ref diagram showing production grade QLDB setup](https://github.com/AWS-South-Wales-User-Group/qldb-bicycle-licence-demo)

- Docs suggest the max TPS of QLDB to be 2-3x that of the traditional blockchain. But they have no mention on which blockchain is taken as reference for the benchmarking.

    Per this [stackoverflow query](https://stackoverflow.com/questions/58254582/amazon-qldb-have-any-scaling-performance-limits/58630222?noredirect=1#comment105595885_58630222) answered by a developer from QLDB team, 100 db writes per second can be taken as ref. point.
