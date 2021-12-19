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
const telaInicio = (email) => {
    fetch(`/people/${email}/transaction/:id`)
        .then(x => x.text())
        .then(JSON.parse)
        .then(dado => {
            let usuarioLancamentos = document.querySelector(".com-lancamentos")
            let usuarioSemLancamentos = document.querySelector(".sem-lancamentos")

            if (dado.transacao.length <= 0) {
                usuarioLancamentos.style.display = "none"
                usuarioSemLancamentos.style.display = "inline"
            } else {
                usuarioSemLancamentos.style.display = "none"
                usuarioLancamentos.style.display = "inline"
            }
        })

}

const emailMarta = "martadaconceicaotonet@gmail.com"
const emailCaio = "caio@kkkrying.com"
const emailGe = "gessica@meuemail.com"
const emailTai = "tailalima.ds@gmail.com"
const emailGerman = "german@neon.com"
const emailPam = "pamela@dosteclados.com"

// telaInicio(emailGe)
// telaInicio(emailTai)