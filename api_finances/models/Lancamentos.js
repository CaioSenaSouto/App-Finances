const mongoose = require('mongoose');
const schema = mongoose.Schema;

const lancamento = new schema({
  email: {type: String, required:true},
  valor: {type: Double, required:true},
  data: {type:Date, default: Date.now},
  descricao: {type: String, require: true}
});

//Criando a colletion com nome clientes
module.exports = mongoose.model("lancamentos", lancamento)