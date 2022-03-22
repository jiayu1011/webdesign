import mysql from 'mysql'
import config from "../config/config";

export default mysql.createConnection(config.database)