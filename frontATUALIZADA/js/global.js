let allTransactions = []

let match = []

const databaseSearch = {
  usuario: {
    email: 'tailalima.ds@gmail.com'
  },
  async porUsuario() {
    let url = '/people/:email/transaction'
    transcoes = await fetch(url)
      .then(x => x.text())
      .then(JSON.parse)
      .then(data => {
        todasTransacoes = data.transacao
        todasTransacoes.forEach(dado => {
          if (dado.email === this.usuario.email) {
            match.push(dado)
          }
        })
        carregaTransacoes()
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
    let income = 0

    this.all.forEach(transaction => {
      if (transaction.custo > 0) {
        income += transaction.custo
      }
    })
    return income
  },

  expenses() {
    let expense = 0

    this.all.forEach(transaction => {
      if (transaction.custo < 0) {
        expense += transaction.custo
      }
    })
    return expense
  },

  total() {
    let saldo = this.incomes() + this.expenses()

    if (saldo > 0) {
      document.getElementById('dinheiro').style.color = 'green'
    } else if (saldo < 0) {
      document.getElementById('dinheiro').style.color = 'red'
    }
    return saldo.toFixed(2)
  }
}

const balanceComponent = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''

    value = String(value).replace(/\D/g, '')
    value = Number(value) / 100
    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return signal + value
  },

  updateBalance() {
    document.getElementById('dinheiro').innerHTML = this.formatCurrency(
      Transactions.total()
    )
  }
}

window.onload = async () => {
  await databaseSearch.porUsuario()
  balanceComponent.updateBalance()
}
