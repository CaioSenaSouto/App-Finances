document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    fetch(`/people/${email}`)
        .then(x => x.text())
        .then(JSON.parse)
        .then(dado => {
            console.log(dado)
        })

    return false
})