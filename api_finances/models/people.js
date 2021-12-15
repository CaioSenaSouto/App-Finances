const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pessoa = new schema({
  nome: {type: String, required:true},
  email: {type: String, required:true},
  senha: {type: String, required:true, select:false},
  aprovado: {type:Boolean, default:false},
  created_at: {type:Date, default: Date.now}
});

//Criando a colletion com nome clientes
module.exports = mongoose.model("pessoa", pessoa)