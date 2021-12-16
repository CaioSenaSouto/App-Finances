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