const express = require('express')
const app = express()
const mongoose = require('mongoose');
const porta = 3000

app.use(express.json())

const Person = require('./models/Person')

const rotas = require('./Rotas/rotas')
rotas(app)


// forma de ler JSON / middlewares

app.use(
  express.urlencoded({
    extended: true
  })
)



//conectando o index ao banco de dados usando o código a baixo
const mongoUri='mongodb+srv://martaTonet:Constantina1!@cluster0.achaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri).then(function(){
    console.log(`Conectado ao banco de dados`)

    app.listen(porta, function() {
        console.log(`rodando app na url http://localhost:${porta}/lancamentos`)
    })

}).catch(function(erro){
    console.log(`Falha ao conectar-se:${erro}`)
})


// @qEmd9Ntf!cKt.A

// mongodb+srv://Time05:@qEmd9Ntf!cKt.A@apicluster.klywl.mongodb.net/bancodaapi?retryWrites=true&w=majority

// entregar uma porta
// const DB_USER = 'Time05'
// const DB_PASSWORD = '%40qEmd9Ntf!cKt.A'

// mongoose
//   .connect(
//     `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.klywl.mongodb.net/bancodaapi?retryWrites=true&w=majority`
//   )
//   .then(() => {
//     console.log('Conectamos ao MongoDB!')
//     app.listen(3000,function() {
//                 console.log(`rodando app na url http://localhost:${3000}/lancamentos`)
//             })
//   })
//   .catch(err => console.log(err))

// app.get('/lancamentos', (req, res) => {
//   res.send({ message: 'Hello Express!' })
// })

