window.ans = [];

const cardFactory = (ans) => {
    return  `            
        <div class="card-content">
            <h3 class="ans-name">Nome: <span class="name-content">${ans.name}</span></h3>
            <h5 class="assunto-card">Assunto: <span class="assunto-content">${ans.assunto}</span></h5>
            <p class="mensagem-card">${ans.mensagem}</p>
            <input type="button" id="excluir" value="Excluir" class="botao botao-exclui botao-exclui-uma"/>
        </div>
    `
}

const limpaForm = () => {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('assunto').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('mensagem').value = '';
}

const answerFactory = () => {
    const obj = {};

    obj.name = document.getElementById('nome').value;
    obj.email = document.getElementById('email').value;
    obj.assunto = document.getElementById('assunto').value;
    obj.telefone = document.getElementById('telefone').value;
    obj.mensagem = document.getElementById('mensagem').value;

    limpaForm();

    return obj;
}

const popularLista = (card, isSearch, isDelete) => {
    const cardDiv = document.getElementById('card');
    const contentCardDiv = cardDiv.innerHTML;

    cardDiv.innerHTML = contentCardDiv + card;
}

const popularArray = (array) => {
    for(const answer of array){
        popularLista(cardFactory(answer));
    }
}

const esvaziaLista = () => {
    const cardDiv = document.getElementById('card');
    cardDiv.innerHTML = '';
}

const excluirTodas = () => {
    esvaziaLista
    localStorage.removeItem("respostas");
}

const buscar = () => {
    const busca = document.getElementById('busca').value.toLowerCase();
    const resultados = window.ans.filter((ans) => ans.name.toLowerCase().includes(busca) || ans.assunto.toLowerCase().includes(busca) || ans.mensagem.toLowerCase().includes(busca));

    esvaziaLista();

    if(!resultados){
        const cardDiv = document.getElementById('card');
        cardDiv.innerHTML = '0 resultados encontrados.';
    }

    popularArray(resultados);
}

const onLoad = () => {
    window.ans = JSON.parse(localStorage.getItem("respostas"));

    if(!localStorage.getItem("respostas")){
        window.ans = [];
        return;
    }

    popularArray(window.ans);
}

const setStorage = () => {
    const answers = window.ans;
    const answer = answerFactory();

    popularLista(cardFactory(answer));
    answers.push(answer);
    window.ans = answers;
    
    localStorage.setItem("respostas", JSON.stringify(window.ans))
}


window.addEventListener('load', onLoad);

document.getElementById('limpa').addEventListener('click', (e) => {
    e.preventDefault();
    limpaForm();
});

document.getElementById('excluir-todas').addEventListener('click', (e) => {
    e.preventDefault();
    excluirTodas();
});

document.getElementById('btnBusca').addEventListener('click', (e) => {
    e.preventDefault();
    buscar();
});

document.getElementById('formulario-contato').addEventListener('submit', (e) => {
    e.preventDefault();
    setStorage();
});

document.getElementById('card').addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.classList.contains('botao-exclui-uma')){
        const obj = {
            name: e.target.parentNode.getElementsByClassName('name-content')[0].innerText,
            assunto: e.target.parentNode.getElementsByClassName('assunto-content')[0].innerText,
            mensagem: e.target.parentNode.getElementsByClassName('mensagem-card')[0].innerText
        }

        const found = window.ans.find((ans) => ans.name.includes(obj.name) && ans.assunto.includes(obj.assunto) && ans.mensagem.includes(obj.mensagem));
        window.ans.splice(window.ans.indexOf(found), 1);
        localStorage.setItem('respostas', JSON.stringify(window.ans));

        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
})