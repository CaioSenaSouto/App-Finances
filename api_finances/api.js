// config inicial
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const porta = 3000

// forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true
  })
)



app.use(express.json())


app.get('/lancamentos', (req, res) => {
  res.send({ message: 'Hello Express!' })
})

mongoose.connect('mongodb://localhost/financa').then(function(){
    console.log(`Conectado ao banco de dados`)

    app.listen(porta, function() {
        console.log(`rodando app na url http://localhost:${porta}/lancamentos`)
    })

}).catch(function(erro){
    console.log(`Falha ao conectar-se:${erro}`)
})

