const usuarioInfo = id => {
  fetch(`/people/${id}`)
    .then(x => x.text())
    .then(JSON.parse)
    .then(data => {
      usuario = data.pessoa
      consulta.porUsuario()
    })
}

const usuarioLogado = id => {
  fetch(`/people/${id}`)
    .then(x => x.text())
    .then(JSON.parse)
    .then(data => {
      document.getElementById('usuario').innerText = data.pessoa.nome
    })
}

// alterar para receber array de lançamentos do usuário
const telaInicio = email => {
  fetch(`/people/:email/transaction/${email}`)
    .then(x => x.text())
    .then(JSON.parse)
    .then(dado => {
      let usuarioLancamentos = document.querySelector('.com-lancamentos')
      let usuarioSemLancamentos = document.querySelector('.sem-lancamentos')
      if (dado.transacao?.length <= 0) {
        usuarioSemLancamentos.style.display = 'inline'
      } else {
        usuarioLancamentos.style.display = 'inline'
      }
    })
}

const emailMarta = 'martadaconceicaotonet@gmail.com'
const emailCaio = 'caio@kkkrying.com'
const emailGe = 'gessica@meuemail.com'
const emailTai = 'tailalima.ds@gmail.com'
const emailGerman = 'german@neon.com'
const emailPam = 'pamela@dosteclados.com'

// telaInicio(emailGe)
telaInicio(emailTai)

let match = []
const consulta = {
  porUsuario() {
    let url = '/people/:email/transaction'
    transcoes = fetch(url)
      .then(x => x.text())
      .then(JSON.parse)
      .then(data => {
        todasTransacoes = data.transacao
        todasTransacoes.forEach(dado => {
          if (dado.email == usuario.email) {
            match.push(dado)
          }
        })
        carregaTransacoes()
      })
  }
}
var usuario
var todasTransacoes
const id = '61b9fd250870d00cc83a7df8'

usuarioLogado(id)
usuarioInfo(id)

var transactions = []

function carregaTransacoes() {
  match.forEach(transacao => {
    transactions.push({
      titulo: transacao.descricao,
      valor: transacao.valor.toFixed(2),
      data: transacao.data,
      id: transacao._id
    })
  })
  App.init()
}

const Transaction = {
  //add valor const App e clear Transactions
  all: transactions,
  remove(index) {
    let transacao = transactions[index]
    let url = `/people/:email/transaction/${transacao.id}`

    var req = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }

    fetch(url, req)
      .then(response => response.json())
      .then(data => console.log('sucesso', data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch(err => console.log('erro', err))

    Transaction.all.splice(index, 1)
    DOM.clearTransactions()
    document.location.reload()
  },

  incomes() {
    let income = 0
    Transaction.all.forEach(transaction => {
      if (transaction.valor > 0) {
        income += parseFloat(transaction.valor)
      }
    })
    return income.toFixed(2)
  },

  expenses() {
    let expense = 0
    Transaction.all.forEach(transaction => {
      if (transaction.valor < 0) {
        expense += parseFloat(transaction.valor)
      }
    })
    return expense.toFixed(2)
  },

  total() {
    let saldo =
      parseFloat(Transaction.incomes()) + parseFloat(Transaction.expenses())

    if (saldo > 0) {
      document.getElementById('dinheiro').style.color = 'green'
    } else {
      document.getElementById('dinheiro').style.color = 'red'
    }
    return saldo.toFixed(2)
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#table tbody'),
  addHeader() {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLHeader()
    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLHeader() {
    const html = `
        <tr>
        <th>Título</th>
        <th>Custo</th>
        <th>Data</th>
        <th>Ações</th>
        </tr>`

    return html
  },
  addTransaction(transaction, index) {
    transaction.date = transaction.data.slice(0, 10)
    transaction.valor = transaction.valor
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)

    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.valor > 0 ? 'entrada' : 'saida'

    const CSSnumber = transaction.valor > 0 ? 'green' : 'red'

    const valor = Utils.formatCurrency(transaction.valor)

    const html = `
            <td class="${CSSclass}" id="edit" onClick="return editar(event)" contenteditable="false" idBanco=${transaction.id}>${transaction.titulo}</td>
            <td class="${CSSnumber}" "saida-valor" "entrada-valor"  id="edit" contenteditable="false">${valor}</td>
            <td class="info-data" contenteditable="false"  id="edit">${transaction.date}</td>
            <td>
                <a id="editar" onClick="return editar(event);" href="./tabela.html">
                        <img id="lapis" src="./assets/Vector.svg" alt="imagem de um lápis">
                    </a>
                    <a href="#">
                        <img id="lixeira" onclick="Transaction.remove(${index})" src="./assets/lixo.svg" alt="imagem de uma lixeirinha">
                    </a>
                </td>
            `
    return html
  },

  updateBalance() {
    document.getElementById('dinheiro').innerHTML = Utils.formatCurrency(
      Transaction.total()
    )
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ''
  }
}
const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''

    value = String(value).replace(/\D/g, '')
    value = Number(value) / 100
    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return signal + value
  }
}

const App = {
  init() {
    if (Transaction.all?.length) {
      DOM.addHeader()
      Transaction.all.forEach((transaction, index) => {
        DOM.addTransaction(transaction, index)
      })
      DOM.updateBalance()
    }
  },
  reload() {
    DOM.clearTransactions()
    App.init()
  }
}

function listenEditar() {
  document.getElementById('editar').addEventListener('click', editar)
}

var transcoes

function editar(event) {
  if (
    event.path[3].children[0].contentEditable == 'false' &&
    event.path[3].children[1].contentEditable == 'false' &&
    event.path[3].children[2].contentEditable == 'false'
  ) {
    event.path[3].children[0].contentEditable = true
    event.path[3].children[1].contentEditable = true
    event.path[3].children[2].contentEditable = true
    return false
  } else {
    event.path[3].children[0].contentEditable = false
    event.path[3].children[1].contentEditable = false
    event.path[3].children[2].contentEditable = false
    let id = event.path[3].children[0].attributes.idbanco.value

    let url = `/people/:email/transaction/${id}`
    let valor = event.path[3].children[1].innerText
    let data = event.path[3].children[2].innerText
    let descricao = event.path[3].children[0].innerText
    let email = 'tailalima.ds@gmail.com'
    let valorAlterado = valor.replace('R$', '')
    valor = parseFloat(valorAlterado)

    const file = { valor, data, descricao, email }

    var req = {
      method: 'PUT',
      body: JSON.stringify(file),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      params: { _id: id }
    }

    fetch(url, req)
      .then(response => response.json())
      .then(data => console.log('sucesso', data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch(err => console.log('erro', err))
    return true
  }
}

async function consultaTransactions() {
  let url = '/people/:email/transaction'
  transcoes = await fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson
    })
}
