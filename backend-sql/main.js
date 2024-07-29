const express = require('express')
const cors = require('cors')
const config = require('config')
const app = express()
const contryPopRoute = require('./routes/countryPopRoute')

const port = config.get("serve.port")
const version = config.get("serve.version")

app.use(cors())
app.use(`/api/v${version}/country`, contryPopRoute)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})