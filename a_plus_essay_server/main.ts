import express from 'express'

import Knex from "knex";
import config from "./knexfile"

export const knex = Knex(config[process.env.NODE_ENV || "development"])

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ message: 'hello world' })
})

const port = 8111

app.listen(port, () => {
    console.log(`Listening to ${port}`)
})