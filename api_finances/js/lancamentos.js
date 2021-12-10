const campos = document.querySelectorAll("[required]");

function validacao(e) {
    const campo = e.target

    function verificandoErro() {
        let erroEncontrado = false;

        for(let erro in campo.validity) {
            if (erro != "customError" && campo.validity[erro]) {
                erroEncontrado = erro;
            }
        }
        return erroEncontrado;
    }

    const erro = verificandoErro()

    if (erro) {
        campo.setCustomValidity("Hey, não esquece de mim :(")
        campo.style.border = "3px solid rgb(255, 56, 56)"
    } else {
        campo.setCustomValidity("")
        campo.style.border = "3px solid rgb(12, 165, 165)"
    }
}

for (let campo of campos) {
    campo.addEventListener("invalid", validacao)
}

document.querySelector("form").addEventListener("submit", e => { 
    console.log("Enviar formulário");
    e.preventDefault()
})