const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function listaEndereco() {
    var user = localStorage.getItem('user');
    let token = JSON.parse(user).access_token;

    let resposta = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    });

    resposta.json().then(responseData => {
        let listEnderecos = responseData.data;
        // Limpar o conteúdo da tabela
        var tabela = document.querySelector("table");
        tabela.innerHTML = "<tr><th>Title</th><th>CEP</th><th>Endereço</th><th>Numero</th><th>Ações</th></tr>";

        // Adicionar cada endereço à tabela
        responseData.data.forEach(endereco => {
            var novaLinha = tabela.insertRow();
            var celulaMoradia = novaLinha.insertCell(0);
            var celulaCep = novaLinha.insertCell(1);
            var celulaEndereco = novaLinha.insertCell(2);
            var celulaNumero = novaLinha.insertCell(3);
            //Acrecentamos Ações aqui para criar uma nova coluna
            var celulaAcoes = novaLinha.insertCell(4);

            celulaMoradia.innerHTML = endereco.title;
            celulaCep.innerHTML = endereco.cep;
            celulaEndereco.innerHTML = endereco.address;
            celulaNumero.innerHTML = endereco.number;
            //Criamos o botão que ira executar a função de deletar
            var botaoDeletar = document.createElement("button");
            botaoDeletar.innerHTML = "Deletar";
            botaoDeletar.onclick = function() { deletarEndereco(endereco.id) };
            celulaAcoes.appendChild(botaoDeletar);
        });
    }).catch(error => {
        console.log('error', error);
    });
}

async function deletarEndereco(id) {
    var user = localStorage.getItem('user');
    let token = JSON.parse(user).access_token;
    //É uma template string do JavaScript usada para construir uma URL dinâmica, incluindo o ID específico do endereço que se deseja deletar
    let resposta = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    });

    if (resposta.ok) {
        listaEndereco(); // Recarregar a lista de endereços após a exclusão
    } else {
        console.log('Falha ao deletar o endereço');
    }
}

listaEndereco();