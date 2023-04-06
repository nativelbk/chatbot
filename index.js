const express = require('express')
const app = express()
require('dotenv').config()
const webhookRoutes = require('./routes/webhooks-routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())



app.use('/',webhookRoutes)

const port = process.env.PORT || 3000

app.listen(port,console.log(`Server is listening on port ${port}...`))