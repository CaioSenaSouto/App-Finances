module.exports = function(app) {

    const peopleCrudes = require('../controllers/people')
    const transactionCrudes = require('../controllers/lancamentos')

    app.route('/people').post(peopleCrudes.novoCliente)
    app.route('/people').get(peopleCrudes.busca)
    app.route('/people/:id').get(peopleCrudes.buscaId)
    app.route('/people/:email').get(peopleCrudes.buscaEmail)
    app.route('/people/:id').put(peopleCrudes.atualizar)
    app.route('/people/:id').delete(peopleCrudes.apagar)
    app.route('/people/:email/transaction').post(transactionCrudes.novoLancamento)
    app.route('/people/:email/transaction').get(transactionCrudes.busca)
    app.route('/people/:email/transaction/:email').get(transactionCrudes.buscaEmail)
    app.route('/people/:email/transaction/:id').put(transactionCrudes.atualizar)
    app.route('/people/:email/transaction/:id').delete(transactionCrudes.apagar)

}