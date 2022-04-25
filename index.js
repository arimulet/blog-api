import express from 'express'
import bodyParser from 'body-parser'
import routes from './src/routes'
// import { databaseSettings } from './src/config'
const app = express()
const PORT = process.env.PORT || 3000


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server created at http://localhost:${PORT}`);
    
   
})