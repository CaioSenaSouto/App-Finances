const mongoose = require('mongoose');
const people = mongoose.model('people');



// código  post de cadastro do cliente
exports.novoCliente = (req, res) => {
    let cliente = new people(req.body)

    cliente.save((erro, cliente) => {
        if (erro) {
            res.status(400).send({ erro })
        } else {
            res.status(201).send({ cliente })
        }
    })
}


// Código get all para buscar todos os cadastros
exports.busca = (req, res) => {
    people.find({}, (erro, cliente) => {
        if (erro) {
            res.status(404).send({ erro: 'Nenhum registro encontarado' })
        } else {
            res.status(302).send({ cliente })
        }
    })
}

//fazendo get por id
exports.buscaId = (req, res) => {
    people.findOne({ '_id': req.params.id }, function (erro, cliente) {
        if (erro) {
            res.status(404).send({ erro: 'Dados não encontrado' })
        } else {
            res.status(302).send({ cliente })
        }
    })
}

//Código update para atualizar dados
exports.atualizar = (req, res) => {
    people.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true }, function (erro, atualizado) {
        if (erro) {
            res.status(400).send({ erro: 'Não atualizado' })
        } else {
            res.status(201).send({ atualizado })
        }
    })
}

//Código delete para deletar
exports.apagar = (req, res) => {
    people.deleteOne({ _id: req.params.id }, function (erro, deletado) {
        if (erro) {
            res.status(400).send({ erro: 'Cliente não encontrado' })
        } else {
            res.status(202).send(deletado)
        }
    })
}