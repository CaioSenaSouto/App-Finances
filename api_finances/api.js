const express = require('express')
const mongoose = require('mongoose')
const app = express()
const porta = 3000

const Person = require('./models/Person')

// forma de ler JSON / middlewares

app.use(
        express.urlencoded({
            extended: true
        })
    )
    //get para testar
app.get('/lancamentos', function(req, res) {
    res.send('Buscar lançamentos')
})


//conectando o index ao banco de dados usando o código a baixo
mongoose.connect('mongodb://localhost/financa').then(function() {
    console.log(`Conectado ao banco de dados`)

    app.listen(porta, function() {
        console.log(`rodando app na url http://localhost:${porta}/lancamentos`)
    })

}).catch(function(erro) {
    console.log(`Falha ao conectar-se:${erro}`)
})


app.use(express.json())

//rotas da API
app.post('/person', async(req, res) => {
    //req.body
    const { name, balance, approved } = req.body

    const person = {
        name,
        balance,
        approved
    }
    try {
        if (name && balance && approved) {
            //criando dados
            await Person.create(person)

            res.status(201).json({ msg: 'Pessoa inserida no sistema com sucesso!' })
        } else {
            res.status(500).json({ error: "É necessário preencher todos os campos." })
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// rota inicial / endpoint
app.get('/', (req, res) => {
    // mostrar req

    res.json({ msg: 'Hello Express!' })
})

// @qEmd9Ntf!cKt.A

// mongodb+srv://Time05:@qEmd9Ntf!cKt.A@apicluster.klywl.mongodb.net/bancodaapi?retryWrites=true&w=majority

// entregar uma porta
const DB_USER = 'Time05'
const DB_PASSWORD = '%40qEmd9Ntf!cKt.A'

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.klywl.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3000)
    })
    .catch(err => console.log(err))

app.get('/lancamentos', (req, res) => {
    res.send({ message: 'Hello Express!' })
})

mongoose.connect('mongodb://localhost/financa').then(function() {
    console.log(`Conectado ao banco de dados`)

    app.listen(porta, function() {
        console.log(`rodando app na url http://localhost:${porta}/lancamentos`)
    })

}).catch(function(erro) {
    console.log(`Falha ao conectar-se:${erro}`)
})