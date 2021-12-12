// const mongoose = require('mongoose')

// const Person = mongoose.model('Person', {
//   name: String,
//   balance: Number,
//   approved: Boolean
// })

// module.exports = Person

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pessoa = new schema({
  nome: {type: String, required:true},
  email: {type: String, required:true},
  aprovado: {type:Boolean, default:false},
  created_at: {type:Date, default: Date.now}
});

//Criando a colletion com nome clientes
module.exports = mongoose.model("lancamentos", pessoa)