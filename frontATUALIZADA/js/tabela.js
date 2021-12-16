const transactions = [
    {
        titulo: 'saida de salário',
        custo: 20000,
        date: '09/12/2021'
    },
    {

        titulo: 'entrada de salário',
        custo: 12,
        date: '09/12/2021'
    },
    {
        titulo: 'saída de salário',
        custo: -8000,
        date: '09/12/2021'
    },
    {
        titulo: 'saída de salário',
        custo: -300,
        date: '09/12/2021'
    },
    {
        titulo: 'saída de salário',
        custo: 300000,
        date: '09/12/2021'
    }
]

const Transaction = {
    //add valor const App e clear Transactions
    all: transactions,
    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },


    incomes() {
        let income = 0;

        Transaction.all.forEach(transaction => {
            if (transaction.custo > 0) {
                income += transaction.custo;
            }
        })
        return income;
    },

    expenses() {

        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.custo < 0) {
                expense += transaction.custo;
            }
        })

        return expense;

    },

    total() {

        return Transaction.incomes() + Transaction.expenses();
    }
};


const DOM = {
    transactionsContainer: document.querySelector('#table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)

    },
    innerHTMLTransaction(transaction, index) {

        const CSSclass = transaction.custo > 0 ? "entrada" : "saida";

        const CSSnumber = transaction.custo > 0 ? "green" : "red";

        const custo = Utils.formatCurrency(transaction.custo)

        const html = `
        <td class="${CSSclass}" id="edit" contenteditable="true">${transaction.titulo}</td>
        <td class="${CSSnumber}" "saida-valor" "entrada-valor"  id="edit" contenteditable="true">${custo}</td>
        <td class="info-data" contenteditable="true"  id="edit">${transaction.date}</td>
        <td>
            <a href="./lancamentos.html">
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
        document.getElementById('dinheiro')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value

    }
}
//add valor

const App = {
    init() {
        Transaction.all.forEach(function (transaction) {
            DOM.addTransaction(transaction)
        })
        DOM.updateBalance()

    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

function msg(){
    confirm("Você quer apagar a mensagem?")
}

function addEventos(){
    document.getElementById("lixeira").addEventListener("click", msg);
}

window.addEventListener("load", addEventos);