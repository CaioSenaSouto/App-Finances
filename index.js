const express = require('express')
const app = express()
const mongoose = require('mongoose');
const porta = 3000

app.use(express.json())

//get para testar
app.get('/lancamentos', function(req,res){
    res.send('Olá grupo 5')
})


//conectando o index ao banco de dados usando o código a baixo
mongoose.connect('mongodb://localhost/financa').then(function(){
    console.log(`Conectado ao banco de dados`)

    app.listen(porta, function() {
        console.log(`rodando app na url http://localhost:${porta}/lancamentos`)
    })

}).catch(function(erro){
    console.log(`Falha ao conectar-se:${erro}`)
})