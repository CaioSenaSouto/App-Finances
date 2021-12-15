const mongoose = require('mongoose');
const schema = mongoose.Schema;

const transaction = new schema({
  email: {type: String, required:true},
  valor: {type: Number, required:true},
//   data: {type:Date, default: Date.now},
  data: {type:Date, required:true},
  descricao: {type: String, require:true}
});

module.exports = mongoose.model("transaction", transaction)