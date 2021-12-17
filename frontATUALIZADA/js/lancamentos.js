import { novoLancamento } from '../../api_finances/controllers/lancamentos';

//function validação de campos
const campos = document.querySelectorAll("[required]");

function validacao(e) {
    const campo = e.target
    function verificandoErro() {
        let erroEncontrado = false;

        for(let erro in campo.validity) {
            if (erro != "customError" && campo.validity[erro] && erro!= "valid") {
                erroEncontrado = erro;
                break
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
    campo.addEventListener("invalid", event=> {
        event.preventDefault
        validacao(event)
    })
    campo.addEventListener("blur", validacao)
}

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault() 
    location.href = './tabela.html';
})


// function casas decimais
// function formatarEntrada() {
//     var elemento = document.getElementById('valor');
//     var valor = elemento.value;
//     console.log(valor)
//     // var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
//     valor = valor + '';
//     valor = valor.replace(/[\D]+/g, '');
//     valor = valor + '';
//     valor = valor.replace(/([0-9]{2})$/g, ",$1");

//     if (valor.length > 6) {
//         valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
//     }

//     elemento.value = valor;

//     if(valor == 'NaN') elemento.value = ''
// }

function radioBox() {
    const radioSaida = document.getElementById("radio-saida")

    if(radioSaida.checked) {
        console.log("saindo. acrescentar um negativo à esquerda")
    }
}


// function formatarEntrada() {
//     let valor = document.getElementById("valor").value
//     var formatter = new Intl.NumberFormat('pt-BR', {
//         style: 'currency',
//         currency: 'BRL'
//       });
//     //   console.log(formatter.format(2500)); /* $2,500.00 */
//     valor = formatter.format(valor)
//     console.log(valor)
// }

<<<<<<< HEAD
usuarioLogado("61b9fd3c0870d00cc83a7dfa")
=======
>>>>>>> main
