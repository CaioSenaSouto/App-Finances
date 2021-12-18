const mongoose = require('mongoose')
const schema = mongoose.Schema

const lancamento = new schema({
  email: { type: String, required: true },
  valor: { type: Number, required: true },
  // verificando a utilização do doble
  data: { type: Date, required: true },
  descricao: { type: String, require: true }
})

module.exports = mongoose.model('lancamento', lancamento)
