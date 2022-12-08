const neo4j = require('neo4j-driver')

function connect(dbName) {
    this.dbName = dbName
    this.driver = neo4j.driver(
        process.env.NEO4J_URL,
        neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
    )
}

function session() {
    return this.driver.session({
        database: this.dbName,
        defaultAccessMode: neo4j.session.WRITE
    })
}

module.exports = {
    connect,
    session,
    dropAll: 'MATCH (n) DETACH DELETE n',
    purchase: 'MERGE (product:Product {id:$productId}) MERGE (user:User {id: $userId}) MERGE (user)-[:BOUGHT]->(product)',
    addUser: 'CREATE (you:Person {name:$userName, id:$userId})',
    addFriend: 'MATCH (you:Person {id:$currentUserId}) MERGE (you)-[r:FRIEND]->(friend:Person {id:$friendUserId})',
    getFriends: 'MATCH (you {id:$currentUser})-[:FRIEND]->(yourFriends)RETURN yourFriends',
}

