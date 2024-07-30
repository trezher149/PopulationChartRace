const { DataTypes } = require('sequelize')
const MySqlConnection = require('../services/mysqlConnectionService')


class CountriesAndPopulationModel extends MySqlConnection {

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

    async insertCountry(countryName) {
        const country = await this.Country.create({country_name: countryName})
        return await country.country_id
    }

    async insertPopulation(fields) {
        await this.Populations.create(fields)
    }

    async createPopulationDemographyTable(field, countryId, year, population) {
        console.log(this.Populations[field])
        var table = this.Populations[field]
        await table.create({country_id: countryId, year: year, population: population})
    }

    async findPopulationDemographic(demographic, year) {
        return await this.Populations[demographic].findAll({
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
            limit: 12
        })
    }

    get countryObj() {
        return this.Country
    }

    get popObj() {
        return this.Populations
    }

    async addPopulationDemography(demographies) {
        this.Populations = {}
        for(var i = 0; i < demographies.length; i++) {
            var field = demographies[i]
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
    }

    async selectPopulationDemographic(fields) {
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

    closeConnection() {
        super.db.close()
    }

}

module.exports = CountriesAndPopulationModel