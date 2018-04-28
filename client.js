var wall = document.getElementById("wall");
var formVisibility = true;
var wallVisibility = false;
var mensagens = [];




function update() {
    var items = this.mensagens.map(e => `<div class="row align-items-center">
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

function showForm() {
    var btnForm = document.getElementById("btnForm");
    var myForm = document.getElementById('myForm');
    formVisibility = !formVisibility;
    if (formVisibility === true) {
        myForm.style.visibility = '';
        btnForm.textContent = "Esconder campos de nova mensagem";
    } else {
        myForm.style.visibility = 'hidden';
        btnForm.textContent = "Enviar nova mensagem";
    }
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
update();   
resetForm(titulo, mensagem, autor);
}

function resetForm(titulo, mensagem, autor) {
    titulo.value = '';
    mensagem.value = '';
    autor.value = '';
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


fetch('http://150.165.85.16:9900/api/msgs')
.then(res => res.json())
.then(res => {
    this.mensagens = res;
    update();
});


