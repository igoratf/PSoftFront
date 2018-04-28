

var wall = document.getElementById("wall");
var formVisibility = true;
var wallVisibility = false;
var optsVisibility = false;
var mensagens = [];

getMessages();

function update(msgList) {
    let items = msgList.map(e => `<div class="row align-items-center">
    <div class="col"></div>
    <div class="col-6 msg-card">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"><strong>${e.title}</strong></h5>
                <p class="card-text">${e.msg}</p> 
                <small>${e.author}</small>
            </div>
        </div>
    </div>
    <div class="col"></div>
    </div>`).join("\n");
    this.wall.innerHTML = items;
}


function onSubmit() {
    var titulo = document.getElementById("title");
    var mensagem = document.getElementById("mensagem");
    var autor = document.getElementById("author");
    
fetch('http://150.165.85.16:9900/api/msgs', {
    method: 'POST',
    body: JSON.stringify({
        title: titulo.value,
        msg: mensagem.value,
        author: autor.value,
        credentials: "ifarias:btree"
    })
});
mensagens.push({
    title: titulo.value,
    msg: mensagem.value,
    author: autor.value
})
update(mensagens);   
resetForm(titulo, mensagem, autor);
}

function resetForm(titulo, mensagem, autor) {
    titulo.value = '';
    mensagem.value = '';
    autor.value = '';
}

function showForm() {
    let btnForm = document.getElementById("btnForm");
    let msgForm = document.getElementById('msgForm');
    formVisibility = !formVisibility;
    if (formVisibility === true) {
        msgForm.style.display = 'block';
        btnForm.textContent = "Esconder campos de nova mensagem";
    } else {
        msgForm.style.display = 'none';
        btnForm.textContent = "Enviar nova mensagem";
    }
}

function showMessages() {
    let btnShow = document.getElementById("btnShowMsgs");
    wallVisibility = !wallVisibility;

    if (wallVisibility === true) {
        wall.style.display = 'block';
        btnShow.textContent = 'Esconder mensagens';
    } else {
        wall.style.display = 'none';
        btnShow.textContent = 'Exibir mensagens';
    }

}

function showOptions() {
    let btnOpts = document.getElementById("btnOpts");
    let options = document.getElementById("optsForm");
    optsVisibility = !optsVisibility;

    if (optsVisibility === true) {
        options.style.display = 'block';
        btnOpts.textContent = "Esconder opções";
    } else {
        options.style.display = 'none';
        btnOpts.textContent = "Outras opções";
    }

}

function filterUpdate(param) {

    let filtered = this.mensagens.filter(e => e.msg.indexOf(param) != -1 || e.title.indexOf(param) != -1 || e.author.indexOf(param) != -1 || e.frontend.indexOf(param) != -1);
    if (filtered.length != 0) {
        update(filtered);
    }
     
}

let filterParam = document.getElementById("filter");
    filterParam.addEventListener("keydown", function(){
        filterUpdate(filterParam.value);
    });



function getMessages() {
    fetch('http://150.165.85.16:9900/api/msgs')
    .then(res => res.json())
    .then(res => {
        this.mensagens = res;
        update(this.mensagens);
    });
}




