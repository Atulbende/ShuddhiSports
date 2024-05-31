import dotenv from 'dotenv'
import  mysql from  'mysql2';
dotenv.config({path:'./.env'});

const pool =   mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE_NAME
})
pool.getConnection((err,con)=>{
    con.release()
})
export default pool;
// getting host,user,password from .env,databasename from contants only for learning we add databasename in contans.