const mongoose = require('mongoose');
const Transaction = mongoose.model('transaction');


//tentar usar email do path
// código  post de lancamento do cliente
exports.novoLancamento = (req, res) => {
    let transaction = new Transaction(req.body)

    transaction.save((erro, transaction) => {
        if (erro) {
            res.status(400).send({ erro })
        } else {
            res.status(201).send({ transaction })
        }
    })
}