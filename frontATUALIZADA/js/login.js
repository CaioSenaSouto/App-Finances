document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()

    let email = document.getElementById('email').value

    fetch(`/people/email/${email}`)
        .then(x => x.text())
        .then(JSON.parse)
        .then(dado => {
            if(!dado.pessoa){
                alert('Usuário não encontrado!')
                return false
            }else{
                document.forms["login"].submit();
            }
        })
})