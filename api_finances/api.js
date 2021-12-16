const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const porta = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const Person = require('./models/people')

const Transacao = require('./models/lancamentos')

const rotas = require('./rotas/rotas')
rotas(app)

// forma de ler JSON / middlewares

app.use(
  express.urlencoded({
    extended: true
  })
)

//conectando o index ao banco de dados usando o código a baixo
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

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
