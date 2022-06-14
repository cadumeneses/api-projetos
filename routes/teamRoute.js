const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'team.json')

const getTeams = () => {
    const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : []

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const saveTeam = (teams) => fs.writeFileSync(filePath, JSON.stringify(teams, null, '\t'))

const teamRoute = (app) => {
    app.route('/teams/:id?')
    .get((req, res) => {
        const teams = getTeams()

        res.send({ teams })
    })
    .post((req, res) => {
        const teams = getTeams()
        teams.push(req.body)
        saveTeam(teams)

        res.status(201).send('Ok')
    })
    .put((req, res) => {
        const teams = getTeams()

        saveTeam(teams.map(team => {
            if (team.id === req.params.id){
                return {
                    ...team,
                    ...req.body
                }
            }

            return team
        }))

        res.status(200).send('OK')
    })
    .delete((req, res) => {
        const teams = getTeams()

        saveTeam(teams.filter(team => team.id !== req.params.id))

        res.status(200).send('OK')
    })
}

module.exports = teamRoute