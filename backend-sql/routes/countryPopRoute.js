const express = require('express')
const router = express.Router()
const CountriesModel = require('../models/countries')

tableLists = [
    "population",
    "population_of_children_under_the_age_of_1",
    "population_of_children_under_the_age_of_5",
    "population_of_children_under_the_age_of_15",
    "population_under_the_age_of_25",
    "population_aged_15_to_64_years",
    "population_older_than_15_years",
    "population_older_than_18_years",
    "population_at_age_1",
    "population_aged_1_to_4_years",
    "population_aged_5_to_9_years",
    "population_aged_10_to_14_years",
    "population_aged_15_to_19_years",
    "population_aged_20_to_29_years",
    "population_aged_30_to_39_years",
    "population_aged_40_to_49_years",
    "population_aged_50_to_59_years",
    "population_aged_60_to_69_years",
    "population_aged_70_to_79_years",
    "population_aged_80_to_89_years",
    "population_aged_90_to_99_years",
    "population_older_than_100_years"
]

router.get("/population", async (req, res) => {
    const Countries = new CountriesModel()
    const startYear = 1950
    const endYear = 2021
    var yearsData = {}
    var status = 200
    const demographicType = tableLists[parseInt((req.query.demographicType))]
    try {
        if (demographicType == undefined) throw new TypeError
        await Countries.populatePopTable([demographicType])
        for(var i = startYear; i <= endYear; i++) {
            const data = await Countries.findPopulation(demographicType, i)
            const d = JSON.stringify(data, null, 2)
            yearsData[i] = JSON.parse(d) 
        }
    }
    catch(e) {
        status = 404
    }
    finally {
        if (status > 399) {
            res.sendStatus(status)
        }
        else {
            res.json(yearsData)
        }
    }
})

module.exports = router