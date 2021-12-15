const express = require('express')
const app = express()
const mongoose = require('mongoose')
const porta = 3000

app.use(express.json())

const Person = require('./models/people')

const Transaction = require('./models/lancamentos')

const rotas = require('./Rotas/rotas')
rotas(app)

// forma de ler JSON / middlewares

app.use(
  express.urlencoded({
    extended: true
  })
)

//conectando o index ao banco de dados usando o código a baixo
const mongoUri =
  'mongodb+srv://Time05:%40qEmd9Ntf!cKt.A@apicluster.klywl.mongodb.net/bancodaapi?retryWrites=true&w=majority'
mongoose
  .connect(mongoUri)
  .then(function () {
    console.log(`Conectado ao banco de dados`)

    app.listen(porta, function () {
      console.log(`rodando app na url http://localhost:${porta}/lancamentos`)
    })
  })
  .catch(function (erro) {
    console.log(`Falha ao conectar-se:${erro}`)
  })