

module.exports  = function(app) {

    const crudes = require('../Crudes/crudes')

    app.route('/lancamentos').post(crudes.novoCliente)
    app.route('/lancamentos').get(crudes.busca)
    app.route('/lancamentos/:id').get(crudes.buscaId)
    app.route('/lancamentos/:id').put(crudes.atualizar)
    app.route('/lancamentos/:id').delete(crudes.apagar)
    
}