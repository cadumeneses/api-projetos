const db = require('./_database')

async function createTables() {
    await db.connect()

    await db.query(`CREATE TABLE projects(
        id serial PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
    )`)

    await db.query(`CREATE TABLE teams(
        id serial PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        project_id INTEGER NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projets(id)
    )`)

    await db.query(`CREATE TABLE people(
        id serial PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        team_id INTEGER NOT NULL,
        FOREIGN KEY (team_id) REFERENCES teams(id)
    )`)
    
    await db.query(`CREATE TABLE tasks(
        id serial PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        project_id INTEGER NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projets(id)
    )`)

    await db.end()

    console.log("Created tables")
}

createTables()