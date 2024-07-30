process.env["NODE_CONFIG_DIR"] = "./config"
const {Sequelize} = require('sequelize')
const Config = require('config')

class MySqlConnection {

    constructor() {
        const host = Config.get('dbConfig.host')
        const username = Config.get('dbConfig.username')
        const password = Config.get('dbConfig.password')
        const port = Config.get('dbConfig.port')
        const db = Config.get('dbConfig.db')
        this.sequelize = new Sequelize(`mysql://${username}:${password}@${host}:${port}/${db}`, {
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