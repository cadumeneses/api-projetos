const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'task.json')

const getTask = () => {
    const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : []

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const savetask = (tasks) => fs.writeFileSync(filePath, JSON.stringify(tasks, null, '\t'))

const taskRoute = (app) => {
    app.route('/tasks/:id?')
    .get((req, res) => {
        const tasks = getTask()

        res.send({ tasks })
    })
    .post((req, res) => {
        const tasks = getTask()
        tasks.push(req.body)
        savetask(tasks)

        res.status(201).send('Ok')
    })
    .put((req, res) => {
        const tasks = getTask()

        savetask(tasks.map(task => {
            if (task.id === req.params.id){
                return {
                    ...task,
                    ...req.body
                }
            }

            return task
        }))

        res.status(200).send('OK')
    })
    .delete((req, res) => {
        const tasks = getTask()

        savetask(tasks.filter(task => task.id !== req.params.id))

        res.status(200).send('OK')
    })
}

module.exports = taskRoute