require('dotenv').config()
const fs = require('fs')

fs.writeFileSync('key.json', process.env.GCP_SERVICE_KEY)