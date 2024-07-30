const csv = require('csv-parser')
const fs = require('node:fs')
const CountriesModel = require('./models/countries')

const records = [];

const excludeDataWithWords = [
    "World",
    "Less",
    "UN",
    "Upper",
    "Lower",
    "More",
    "Least",
    "Low",
    "LLDC",
    "SIDS",
    "High"
]

fs.createReadStream('population-and-demography.csv').pipe(csv({}))
.on("data", (data) => records.push(data))
.on("end", async () => {
    const Countries = new CountriesModel()
    const initFields = Object.keys(records[1])
    var field = []

    await Countries.countryObj.sync()
    .then(async () => {
        for(var i = 2; i < initFields.length; i++) {
            field.push(initFields[i].replaceAll(" ", "_").toLowerCase())
        }
        await Countries.addPopulationDemography(field)
        var insertingCountryName = ""
        var insertingCountryId = 0
        for(var i = 0; i < records.length; i++) {
            var countryName = records[i]["Country name"]
            var isInExcludeWords = false
            for (var k = 0; k < excludeDataWithWords.length; k++) {
                if (countryName.includes(excludeDataWithWords[k])) {isInExcludeWords = true; break}
            }
            if (isInExcludeWords) {continue}
            if (insertingCountryName != countryName) {
                insertingCountryName = countryName
                insertingCountryId = await Countries.insertCountry(countryName)
            }
            for(var j = 0; j < field.length; j++) {
                Countries.createPopulationDemographyTable(
                    field[j],
                    insertingCountryId,
                    parseInt(records[i]["Year"]),
                    parseInt(records[i][initFields[j+2]])
                )
            }

            console.log(insertingCountryId)
        }
    })


})
