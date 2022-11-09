export type Conta = {
    nome: string,
    cpf: string,
    dataDeNascimento: string,
    saldo: number,
    extrato: Extrato[]
}

export type Extrato = {
    valor: number,
    data: string,
    descricao: string
}

export const clientes: Conta[] = [
    {
        nome: "João",
        cpf: "123.456.789-00",
        dataDeNascimento: "10/10/2000",
        saldo: 0,
        extrato: []
    },
    {
        nome: "Pedro",
        cpf: "123.456.789-01",
        dataDeNascimento: "10/10/2000",
        saldo: 0,
        extrato: []
    },
    {
        nome: "Paulo",
        cpf: "123.456.789-02",
        dataDeNascimento: "10/10/2000",
        saldo: 0,
        extrato: []
    }
]