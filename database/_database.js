const pg = require('pg')
const client = new pg.Client({
    user: "tuser",
    password: "linuxc",
    host: "localhost",
    database: "postgres",
    port: 5432
})

module.exports = client