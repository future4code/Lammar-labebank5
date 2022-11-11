import express, { Request, Response } from "express"
import cors from 'cors'
import { clientes, Extrato, Conta } from './data'

const app = express()
app.use(express.json())
app.use(cors())

//função responsável por pegar todos os usuários existentes no array de usuários.
app.get("/clientes", (req: Request, res: Response) => {
    res.status(200).send(clientes)
})

//função reposavel por adicionar um novo usuário no array de usuários.
app.post('/novocliente', (req: Request, res: Response) => {
    let errorCode: number = 400
    try {
        const { nome, cpf, dataDeNascimento, saldo, extrato } = req.body
        
        if (!nome || !cpf || !dataDeNascimento || !extrato) {
            errorCode = 401
            throw new Error("Preencha todos os campos")
        }

        //verficar se tem + de 18 anos
        const hoje = new Date()
        const nascimento = new Date(dataDeNascimento)

        // retorna a idade em milisegundos
        const conta = Math.abs(nascimento.getTime() - hoje.getTime())

        // math.ceil arredonda para cima
        // 1000 milisegundos = 1 segundo / 60 segundos = 1 minuto / 60 minutos = 1 hora / 24 horas = 1 dia

        const idadeEmDias = Math.ceil(conta / (1000 * 60 * 60 * 24))

        // math.floor arredonda para baixo
        const idadeEmAnos = Math.floor(idadeEmDias / 365)

        if (idadeEmAnos < 18) {
            errorCode = 403
            throw new Error("Usuário menor de idade")
        }

        //verificar se a data de nascimento está no formato correto
        if(nascimento.toString() === "Invalid Date"){
            errorCode = 401
            throw new Error("Data de nascimento inválida")
        } 

        //verificar se o cpf já existe
        if(clientes.find((cliente) => cliente.cpf === cpf)){
            errorCode = 409
            throw new Error("CPF já cadastrado")
        }

        //verficar se o cpf está no formato correto
        if(cpf.length !== 11){
            errorCode = 422
            throw new Error("CPF precisa ter 11 dígitos")
        }

        if(typeof cpf !== "string"){
            errorCode = 422
            throw new Error("CPF precisa ser uma string")
        }

        //verificar formato do saldo
        if(typeof saldo !== "number"){
            errorCode = 422
            throw new Error("Saldo precisa ser um número")
        }

        if(saldo !== 0){
            errorCode = 422
            throw new Error("Saldo precisa ser 0")
        }
        
        const newClient: Conta = {
            nome,
            cpf,
            dataDeNascimento,
            saldo,
            extrato
        }

        clientes.push(newClient)
        res.status(201).send(clientes)
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
})

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})
