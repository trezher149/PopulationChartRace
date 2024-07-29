process.env["NODE_CONFIG_DIR"] = "./config"
const {Sequelize} = require('sequelize')
const Config = require('config')

class MySqlConnection {

    constructor() {
        const username = Config.get('dbConfig.username')
        const password = Config.get('dbConfig.password')
        const port = Config.get('dbConfig.port')
        const db = Config.get('dbConfig.db')
        this.sequelize = new Sequelize(`mysql://${username}:${password}@localhost:${port}/${db}`, {
        })
    }

    get db() {
        return this.sequelize
    }

    dropAll() {
        this.sequelize.drop()
    }
}

module.exports = MySqlConnection