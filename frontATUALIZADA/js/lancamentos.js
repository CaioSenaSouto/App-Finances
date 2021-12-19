//function validação de campos
const campos = document.querySelectorAll("[required]");

function validacao(e) {
    const campo = e.target

    function verificandoErro() {
        let erroEncontrado = false;

        for (let erro in campo.validity) {
            if (erro != "customError" && campo.validity[erro] && erro != "valid") {
                erroEncontrado = erro;
            }
        }
        return erroEncontrado;
    }

    const erro = verificandoErro()

    if (erro) {
        campo.setCustomValidity("Hey, não esquece de mim :(")
        campo.style.border = "3px solid rgb(255, 56, 56)"
        campo.focus()
    } else {
        campo.setCustomValidity("")
        campo.style.border = "3px solid rgb(12, 165, 165)"
    }
}

for (let campo of campos) {
    campo.addEventListener("invalid", event => {
        event.preventDefault
        validacao(event)
    })
    campo.addEventListener("blur", validacao)
}

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()

    // let url = 'http://localhost:3000/people/:email/transaction'
    // let valor = document.getElementById('valor').value
    // let data = document.getElementById('data').value
    // let descricao = document.getElementById('desc').value
    // let email = usuario.email

    // const file = { valor, data, descricao, email }

    // var req = {
    //     method: 'POST',
    //     body: JSON.stringify(file),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // };

    // fetch(url, req)

    async function lancaDados(email = "tailalima.ds@gmail.com") {
        console.log("na function")
        const valor = document.getElementById("valor").value
        const data = document.getElementById("data").value
        const descricao = document.getElementById("desc").value 
    
        const rawResponse = await fetch(`http://localhost:3000/people/${email}/transaction`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: `${email}`, valor: `${valor}`, data: `${data}`, descricao: `${descricao}`})
        });
        const content = await rawResponse.json();
    };

    lancaDados()

    location.href = './tabela.html'
})

const usuarioLogado = (id) => {
    fetch(`http://localhost:3000/people/${id}`)
        .then(x => x.text())
        .then(JSON.parse)
        .then(data => {
            document.getElementById("usuario").innerText = data.pessoa.nome
        })
}

// const usuarioInfo = (id) => {
//     fetch(`http://localhost:3000/people/${id}`)
//         .then(x => x.text())
//         .then(JSON.parse)
//         .then(data => {
//             usuario = data.pessoa
//             consulta.porUsuario()
//         })
// }



usuarioLogado("61b9fd250870d00cc83a7df8")
// usuarioInfo("61b9fd250870d00cc83a7df8")