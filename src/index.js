import express from "express";
import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';
config();

const app = express()

const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    port: process.env.MYSQLDB_DOCKER_PORT,
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()')
    res.json(result[0])
})

app.listen(process.env.NODE_DOCKER_PORT)
console.log('Server corriendo en el puerto', process.env.NODE_DOCKER_PORT)