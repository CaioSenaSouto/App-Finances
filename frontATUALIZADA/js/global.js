// const usuarioLogado = (id) => {
//     fetch(`http://localhost:3000/people/${id}`)
//     .then(x => x.text())
//     .then(JSON.parse)
//     .then(dado => {
//         document.getElementById("usuario").innerText = dado.pessoa.nome
//     })
// }

// const idCaio = "61b9fd3c0870d00cc83a7dfa"
// const idMarta = "61b9fd0e0870d00cc83a7df6"
// const idPam = "61b9fd500870d00cc83a7dfc"
// const idGe = "61b9fb2a0870d00cc83a7def"
// const idGerman = "61b9fd5f0870d00cc83a7dfe"
// const idTai = "61b9fd250870d00cc83a7df8"

// // usuarioLogado(idGe)
// usuarioLogado(idCaio)

// alterar para receber array de lançamentos do usuário
// const telaInicio = (email) => {
//     fetch(`http://localhost:3000/people/email/transaction/${email}`)
//         .then(x => x.text())
//         .then(JSON.parse)
//         .then(dado => {
//             let usuarioLancamentos = document.querySelector(".sem-lancamentos")
//             let usuarioSemLancamentos = document.querySelector(".com-lancamentos")

//             if (dado.transacao.length <= 0) {
//                 usuarioLancamentos.style.display = "none"
//                 usuarioSemLancamentos.style.display = "inline"
//             } else {
//                 usuarioSemLancamentos.style.display = "none"
//                 usuarioLancamentos.style.display = "inline"
//             }
//         })

// }

// const emailMarta = "martadaconceicaotonet@gmail.com"
// const emailCaio = "caio@kkkrying.com"
// const emailGe = "gessica@meuemail.com"
// const emailTai = "tailalima.ds@gmail.com"
// const emailGerman = "german@neon.com"
// const emailPam = "pamela@dosteclados.com"

// telaInicio(emailGe)
// telaInicio(emailCaio)

let allTransactions = []

let match = [];

const databaseSearch = {
  usuario: {
    email: 'luis@luis.com'
  },
    async porUsuario() {
        let url = 'http://localhost:3000/people/:email/transaction'
        transcoes = await fetch(url).then(x => x.text())
            .then(JSON.parse)
            .then(data => {
                todasTransacoes = data.transacao
                todasTransacoes.forEach(dado => {
                    if (dado.email === this.usuario.email) {
                        match.push(dado)
                    }
                })
                carregaTransacoes();
            })

    }
}

function carregaTransacoes() {
  match.forEach(transacao => {
      allTransactions.push({
          titulo: transacao.descricao,
          custo: transacao.valor,
          data: transacao.data,
          id: transacao._id
      })
  })
}
const Transactions = {
  all: allTransactions,
  incomes() {
      let income = 0;

      this.all.forEach(transaction => {
          if (transaction.custo > 0) {
              income += transaction.custo;
          }
      })
      return income;
  },

  expenses() {
    let expense = 0;
    
    this.all.forEach(transaction => {
        if (transaction.custo < 0) {
            expense += transaction.custo;
        }
    })
      return expense;

  },

  total() {
      return this.incomes() + this.expenses();
  },
}

const balanceComponent = {
  
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    return signal + value
  },

  updateBalance() {
    document.getElementById('dinheiro')
        .innerHTML = this.formatCurrency(Transactions.total())
    
  },
}

window.onload = async () => {
  await databaseSearch.porUsuario()
  balanceComponent.updateBalance()
}