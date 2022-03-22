import express from 'express'
import connection from '../database/database'
import moment from "moment"

let router = express.Router()

router.get('/', (req, res, next) => {
    console.log(req.query)
    res.json({
        msg: 'It\'s index'
    })
    next()
})
router.get('/test', (req, res, next) => {
    console.log(`request: ${moment().format()} ------------------- ${req.url}`)

    connection.query('select * from hongyioj_user', (err, results) => {
        if(err) throw err
        else {
            res.send(results)
            next()
        }
    })
})
router.get('/create/database', (req, res, next) => {
    connection.query('CREATE DATABASE biaoge', (err, result) => {
        if(err) throw err
        console.log(result)
        res.send(`Database ${'biaoge'} created...`)
        next()
    })
})
router.get('/create/table', (req, res, next) => {
    connection.query('')
})
router.post('/login', (req, res, next) => {
    console.log(`request: ${moment().format()} ------------------- ${req.url}`)
    console.log(req.body)
    let resJson = {}
    let sql = `select * from hongyioj_user where username='${req.body.username}'`
    new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err
            else {
                let pwd = results[0].password
                resolve(req.body.password===pwd)
            }
        })
    }).then((correct) => {
        let errMsg = correct? '':'password wrong'
        res.json({
            isOk: correct,
            errMsg: errMsg
        })
        next()
    })
})

router.get('/add', (req, res ,next) => {
    console.log(req.query)
    res.send(String(Number(req.query.a) + Number(req.query.b)))
    next()
})

export default router