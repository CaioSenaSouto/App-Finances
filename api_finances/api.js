const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

const Person = require('./models/people')

const Transacao = require('./models/lancamentos')

const rotas = require('./Rotas/rotas')
rotas(app)

// forma de ler JSON / middlewares

app.use(
  express.urlencoded({
    extended: true
  })
)

//conectando o index ao banco de dados usando o código a baixo
const DB_USER = 'Time05'
const DB_PASSWORD = encodeURIComponent('@qEmd9Ntf!cKt.A')
const porta = 3000

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.klywl.mongodb.net/bancodaapi?retryWrites=true&w=majority`
  )
  .then(function () {
    console.log(`Conectado ao banco de dados`)

    app.listen(porta, function () {
      console.log(`rodando app na url http://localhost:${porta}/lancamentos`)
    })
  })
  .catch(function (erro) {
    console.log(`Falha ao conectar-se:${erro}`)
  })

const path = require('path')
app.use('/', express.static(path.join(__dirname, '../frontATUALIZADA')))
