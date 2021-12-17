const mongoose = require('mongoose');
const Pessoa = mongoose.model('pessoa');



// código  post de cadastro do cliente
exports.novoCliente = (req, res) => {
    let pessoa = new Pessoa(req.body)

    pessoa.save((erro, pessoa) => {
        if (erro) {
            res.status(400).send({ erro })
        } else {
            res.status(201).send({ pessoa })
        }
    })
}


// Código get all para buscar todos os cadastros
exports.busca = (req, res) => {
    Pessoa.find({}, (erro, pessoa) => {
        if (erro) {
            res.status(404).send({ erro: 'Nenhum registro encontarado' })
        } else {
            res.status(302).send({ pessoa })
        }
    })
}

//fazendo get por id
exports.buscaId = (req, res) => {
    Pessoa.findOne({ '_id': req.params.id }, function (erro, pessoa) {
        if (erro) {
            res.status(404).send({ erro: 'Dados não encontrado' })
        } else {
            res.status(302).send({ pessoa })
        }
    })
}

//Código update para atualizar dados
exports.atualizar = (req, res) => {
    Pessoa.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true }, function (erro, atualizado) {
        if (erro) {
            res.status(400).send({ erro: 'Não atualizado' })
        } else {
            res.status(201).send({ atualizado })
        }
    })
}

//Código delete para deletar
exports.apagar = (req, res) => {
    Pessoa.deleteOne({" _id": req.params.id }, function (erro, deletado) {
        if (erro) {
            res.status(400).send({ erro: 'Cliente não encontrado' })
        } else {
            res.status(202).send(deletado)
        }
    })
}