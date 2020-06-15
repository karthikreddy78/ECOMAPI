import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import {MongoConnect} from './db/db'
import {
    userRoute, categoryRoute,
    productRoute
  } from "./routes/index";


  import * as helmet from 'helmet';
  import * as compression from 'compression';
dotenv.config()

//const express = require('express')
const app = express()
app.use(helmet());
app.use(compression());

const port =process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())




app.use("/user",userRoute)
app.use("/category",categoryRoute)
app.use("/product",productRoute)
app.get('/', (req, res) => res.send('Hello World!'))
console.log(process.env.PORT)
//console.log(process.env.MONGODB_URL)
app.listen(port, () => {
    MongoConnect.connect().then(res=>console.log('Db connected'))
    
    console.log(`App listening at http://localhost:${port}`)})