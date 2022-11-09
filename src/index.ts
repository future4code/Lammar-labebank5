import express, { Request, Response } from "express"
import cors from 'cors'
import { clientes, Extrato, Conta } from './data'

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log('servidor executando na porta 3003')
})