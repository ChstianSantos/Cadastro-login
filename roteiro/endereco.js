const url =  'https://go-wash-api.onrender.com/api/auth/address';

async function endereco(){

    var user = localStorage.getItem('user');
    let token = JSON.parse(user).access_token;
    let moradia = document.getElementById('moradia').value;
    let cep = document.getElementById('cep').value;
    let rua = document.getElementById('rua').value;
    let numero = document.getElementById('numero').value;
    let complemento = document.getElementById('complemento').value;

    let resposta = await fetch(url,{
        method:"POST",
        body: JSON.stringify(
            {
            "title":moradia,
            "cep":cep,
            "address":rua,
            "number":numero,
            "complement":complemento
            }
        ),
        headers: {
            'Content-type': 'application/json',
            'Authorization': "Bearer "+token
        }
    });

    let data = await resposta.json();

    console.log(data)

    alert("Sucess")
    window.location.href= '../visualizar/home.html'

    
    
}

