const url = 'https://go-wash-api.onrender.com/api/login';

async function loginUsuario(){   
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if(email == "" || password==""){
        alert("E-mail ou senha, estão incompletos ou incorretos ")
        return;
    }

    

    let resposta = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
            {
                "email":email,
                "password": password,
                "user_type_id":1
            }
        ),
        headers:{
            'Content-Type': 'application/json'
        }        
    });

    let data = await resposta.json();

    localStorage.setItem('user', JSON.stringify(data));

    console.log(data)

    if(email==""){
        alert("E-mail incorreto!")
        return
    }

    if(password==""){
        alert("Senha está incorreta!")
        return
    }

    if(data.data?.errors){
        alert(data.data.errors)
        return
    }

    alert("Login feito com sucesso.")
    window.location.href = "home.html"
    
 
}