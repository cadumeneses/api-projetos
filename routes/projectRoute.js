const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'project.json')

const getProjects = () => {
    const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : []

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const saveProject = (projects) => fs.writeFileSync(filePath, JSON.stringify(projects, null, '\t'))

const projectRoute = (app) => {
    app.route('/projects/:id?')
    .get((req, res) => {
        const projects = getProjects()

        res.send({ projects })
    })
    .post((req, res) => {
        const projects = getProjects()
        projects.push(req.body)
        saveProject(projects)

        res.status(201).send('Ok')
    })
    .put((req, res) => {
        const projects = getProjects()

        saveProject(projects.map(project => {
            if (project.id === req.params.id){
                return {
                    ...project,
                    ...req.body
                }
            }

            return project
        }))

        res.status(200).send('OK')
    })
    .delete((req, res) => {
        const projects = getProjects()

        saveProject(projects.filter(project => project.id !== req.params.id))

        res.status(200).send('OK')
    })
}

module.exports = projectRoute