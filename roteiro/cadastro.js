const url = 'https://go-wash-api.onrender.com/api/user';

async function cadastroUsuario(){  

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var cpf_cnpj = document.getElementById('cpf_cnpj');
    var birthday = document.getElementById('birthday');
    
    if(name.value==""){
        alert("Nome precisa ser preenchido!")
        return;
    }

    if(cpf_cnpj.value=="" || cpf_cnpj.value.length != 11){
        alert("CPF_CNPJ precisa ser preenchido, corretamente!")
        return;
    }

    if(email.value==""){
        alert("E-mail precisa ser preenchido!")
        return;
    }
    
    if(password.value=="" || password.value.length <= 6){
        alert("Senha precisa ser preenchido, corretamente!")
        return;
    }
    
    if(birthday.value==""){
        alert("Data de aniversario precisa ser preenchido!")
        return;
    }

    let resposta = await fetch(url,{
        method:"POST",
        body: JSON.stringify(
            {
                "name":name.value,
                "email":email.value,
                "user_type_id":1,
                "password": password.value,
                "cpf_cnpj": cpf_cnpj.value,
                "terms": 1,
                "birthday":birthday.value   
            }
        ),
        headers:{
            'Content-Type': 'application/json'
        }        
    });

    let data = await resposta.json();

    if(data.data.statusCode == 422){
        if(data.data.error?.cpf_cnpj){
            alert(data.data.error?.cpf_cnpj[0])
            return;
        }
        if(data.data.error?.password){
            alert(data.data.error?.password[0])
            return;
        }
        
    }
    
    alert("Sucess");
    window.location.href = '../visualizar/login.html'
   
}