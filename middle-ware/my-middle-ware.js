import moment from "moment";

export function requestLogged(req, res, next){
    console.log(`request: ${moment().format()} ------------------- ${req.url}  method=${req.method}`)
    next()
}