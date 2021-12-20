const mongoose = require('mongoose');
const Transacao = mongoose.model('lancamento');


// código  post de lancamento do transacao
exports.novoLancamento = (req, res) => {
    let transacao = new Transacao(req.body)
    transacao.save((erro, transacao) => {
        if (erro) {
            res.status(400).send({ erro })
        } else {
            res.status(200).send({ transacao })
        }
    })
}


// Código get all para buscar todas transações
exports.busca = (req, res) => {
    Transacao.find({}, (erro, transacao) => {
        if (erro) {
            res.status(404).send({ erro: 'Nenhum lançamento encontrado' })
        } else {
            res.status(200).send({ transacao })
        }
    })
}


//fazendo get por email
exports.buscaEmail = (req, res) => {
    Transacao.find({ 'email': req.params.email }, function(erro, transacao) {
        if (erro) {
            res.status(404).send({ erro: 'Usuário sem lançamentos' })
        } else {
            res.status(200).send({ transacao })
        }
    })
}


//Código update para atualizar dados da transação
exports.atualizar = (req, res) => {
    Transacao.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true }, function(erro, atualizado) {
        if (erro) {
            res.status(400).send({ erro: 'Não atualizado' })
        } else {
            res.status(200).send({ atualizado })
        }
    })
}


//Código delete para deletar
exports.apagar = (req, res) => {
    Transacao.deleteOne({ _id: req.params.id }, function(erro, deletado) {
        if (erro) {
            res.status(400).send({ erro: 'Transacao não encontrada' })
        } else {
            res.status(200).send(deletado)
        }
    })
}