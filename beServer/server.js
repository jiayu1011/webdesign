import express from 'express'
import router from '../router/routes'
import bodyParser from 'body-parser'
import config from '../config/config'
import '@babel/polyfill'
import {requestLogged} from "../middle-ware/my-middle-ware";
import path from 'path'
import ejs from 'ejs'




let app = express()

app.listen(config.port, () => {
    console.log(`Your server is running at http://localhost:${config.port}...`)
})

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'content-type')
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
    if(req.method.toLowerCase() === 'options'){
        res.send(200)
    } else {
        next()
    }
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(requestLogged)

app.use('/', router)

app.set('views', path.resolve(__dirname, '../dist'))
app.set('view engine', 'html')
app.engine('.html', ejs.__express)

