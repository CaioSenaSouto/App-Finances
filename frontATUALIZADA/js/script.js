const usuarioLogado = (id) => {
    fetch(`http://localhost:3000/people/${id}`)
    .then(x => x.text())
    .then(JSON.parse)
    .then(data => {
        document.getElementById("usuario").innerText = data.pessoa.nome
    })
}

const idCaio = "61b9fd3c0870d00cc83a7dfa"
usuarioLogado(idCaio)

// alterar para receber array de lançamentos do usuário
const telaInicio = () => {
    let lancamentos = prompt("O usuário tem quantos lançamentos?")
    let usuarioLancamentos = document.querySelector(".com-lancamentos")
    let usuarioSemLancamentos = document.querySelector(".sem-lancamentos")

    if (lancamentos == 0) {
        usuarioLancamentos.style.display = "none"
        usuarioSemLancamentos.style.display = "inline"
    } else {
        usuarioSemLancamentos.style.display = "none"
        usuarioLancamentos.style.display = "inline"
    }
}

// telaInicio()

