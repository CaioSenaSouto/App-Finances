const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Transacao = new schema({
  email: {type: String, required:true},
  valor: {type: Number, required:true},
//   data: {type:Date, default: Date.now},
  data: {type:Date, required:true},
  descricao: {type: String, require:true}
});

module.exports = mongoose.model("transacao", Transacao)