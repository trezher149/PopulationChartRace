const { DataTypes } = require('sequelize')
const MySqlConnection = require('../services/mysqlConnectionService')


class Countries extends MySqlConnection {

    constructor(pop = {}) {
        super()
        this.Country = super.db.define(
            "Countries",
            {
                country_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                country_name: {
                    type: DataTypes.STRING
                }
            },
            {
                freezeTableName: true,
                timestamps: false
            }
        )

        this.Populations = pop
    }

    async insert(countryName) {
        const country = await this.Country.create({country_name: countryName})
        return await country.country_id
    }

    async popInsert(fields) {
        await this.Populations.create(fields)
    }

    async popInsertTable(field, countryId, year, population) {
        console.log(this.Populations[field])
        var table = this.Populations[field]
        await table.create({country_id: countryId, year: year, population: population})
        // await table.create({year: year, population: population})
    }

    async findPopulation(popTable, year) {
        return await this.Populations[popTable].findAll({
            where: {
                year: year
            },
            attributes: {
                exclude: ["id", "country_id", "year"]
            },
            include: {
                model: this.Country,
                attributes: ["country_name"]
            },
            order: [
                ["population", "DESC"],
            ],
            // include: this.Country.country_name,
            limit: 12
        })
    }

    get countryObj() {
        return this.Country
    }

    get popObj() {
        return this.Populations
    }

    addPopFields(addiFields) {
        var fields = {
            year: {
                type: DataTypes.SMALLINT.UNSIGNED,
            }
        }

        addiFields.forEach((field) => {
            fields[field] = { type: DataTypes.BIGINT.UNSIGNED}
        })

        this.Populations = super.db.define(
            "population_demographic",
            fields,
            {
                freezeTableName: true,
                timestamps: false
            }
        )

        this.Country.hasMany(this.Populations, {foreignKey: "country_id"})
        this.Populations.belongsTo(this.Country)
    }

    async addPopTables(addiFields) {
        this.Populations = {}
        for(var i = 0; i < addiFields.length; i++) {
            var field = addiFields[i]
            var table = super.db.define(
                field,
                {
                    year: {
                        type: DataTypes.SMALLINT.UNSIGNED,
                    },
                    population: { type: DataTypes.BIGINT.UNSIGNED }
                },
                {
                    freezeTableName: true,
                    timestamps: false
                }
            )
            this.Populations[field] = table
            this.Country.hasMany(this.Populations[field], {foreignKey: "country_id"})
            await table.sync({ force: true})
            table.belongsTo(this.Country)
        }
        // await this.Country.sync({ force: true})
    }

    async populatePopTable(fields) {
        for(var i = 0; i < fields.length; i++) {
            var field = fields[i]
            var table = super.db.define(
                field,
                {
                    year: {
                        type: DataTypes.SMALLINT.UNSIGNED,
                    },
                    population: { type: DataTypes.BIGINT.UNSIGNED }
                },
                {
                    freezeTableName: true,
                    timestamps: false
                }
            )
            this.Populations[field] = table
            this.Country.hasMany(this.Populations[field], {foreignKey: "country_id"})
            await this.Populations[field].sync()
            this.Populations[field].belongsTo(this.Country, {foreignKey: "country_id"})
        }
    }

    clone() {
        return new Countries(this.Populations)
    }

    closeConnection() {
        super.db.close()
    }

}

module.exports = Countries