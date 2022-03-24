import express from 'express'
import connection from '../database/database'
import moment from "moment"

let router = express.Router()

router.get('/', (req, res, next) => {
    res.render('index.html')
})
router.get('/login', (req, res, next) => {
    res.render('login.html')
})
router.get('/test', (req, res, next) => {


    connection.query('select * from hongyioj_user', (err, results) => {
        if(err) throw err
        else {
            res.send(results)
            next()
        }
    })
})

router.post('/api/login', (req, res, next) => {
    console.log(req.body)
    let valid = true
    valid &= 'username' in req.body && 'password' in req.body

    if(!valid) {
        res.send('error')
        next()
    } else {
        let sql = `select * from hongyioj_user where username='${req.body.username}'`
        new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                // console.log(results)
                if (err) {
                    reject(err)
                }
                else {
                    resolve(results)
                }
            })
        }).then(data => {
            if(data.length===0){
                res.json({
                    isOk: false,
                    errMsg: 'account not exist..'
                })
            } else if(data[0].password!==req.body.password) {
                res.json({
                    isOk: false,
                    errMsg: 'password wrong..'
                })
            } else {
                res.json({
                    isOk: true,
                    errMsg: ''
                })
            }
        }).catch(err => {
            res.send(err)
        })
    }
})

router.get('/api/add', (req, res ,next) => {
    console.log(req.query)
    res.send(String(Number(req.query.a) + Number(req.query.b)))
    next()
})

export default router