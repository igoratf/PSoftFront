if (typeof moment !== undefined) {
    moment.locale("pt-BR");
}

var wall = document.getElementById("wall");
var formVisibility = true;
var wallVisibility = false;
var optsVisibility = false;
var mensagens = [];

getMessages();

function update(msgList) {
    msgList.sort((a,b) => a.created_at > b.created_at ? -1 : 1);
    let items = msgList.map(function(e) {
        let removeButton = '';
        if (e.frontend === 'ifarias') {
            removeButton = `<button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteMessage(${e.id})">Remover</button>`;
        } else {
            removeButton = `<button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteMessage(${e.id})" disabled>Remover</button>`;
        }

    return (`<div class="col">
    <div class="msg-card">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"><strong>${e.title}</strong></h5>
                <p class="card-text">${e.msg}</p> 
                <p>${e.author}, ${moment(e.created_at).fromNow()}</p>
                <small>ID: ${e.frontend}</small><br>
                ${removeButton}
            </div>
        </div>
    </div>
    
    </div>`)
    }).join("\n");
    wall.innerHTML = items;
}


function onSubmit() {
    let titulo = document.getElementById("title");
    let mensagem = document.getElementById("mensagem");
    let autor = document.getElementById("author");
    let senha = document.getElementById("password");
    
    
fetch('http://150.165.85.16:9900/api/msgs', {
    method: 'POST',
    body: JSON.stringify({
        title: titulo.value,
        msg: mensagem.value,
        author: autor.value,
        credentials: `ifarias:${senha.value}`
    })
});
mensagens.push({
    title: titulo.value,
    msg: mensagem.value,
    author: autor.value
})
update(mensagens);
getMessages();
resetForm();
}

function deleteMessage(index) {
    let senha = document.getElementById("password").value;
    let filtro = document.getElementById("filter");
    fetch('http://150.165.85.16:9900/api/msgs/' + index, {
        method: 'DELETE',
        body: JSON.stringify({
            credentials: `ifarias:${senha}`
        })
    }).then( res=>  {
        getMessages();
    })
   
}



function getMessages() {
    fetch('http://150.165.85.16:9900/api/msgs')
    .then(res => res.json())
    .then(res => {
        mensagens = res;
        update(mensagens);
        if (filterParam.value.length > 0) {
            filterUpdate(filterParam.value);
        }
    });
}

function resetForm() {
    let titulo = document.getElementById("title").value = "";
    let mensagem = document.getElementById("mensagem").value = "";
    let autor = document.getElementById("author").value = "";
    let senha = document.getElementById("password").value = "";
    let filtro = document.getElementById("filter").value = "";
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
        wall.style.display = 'flex';
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


var filterParam = document.getElementById("filter");
    filterParam.addEventListener("keydown", function(){
        filterUpdate(filterParam.value);
    });

function filterUpdate(param) {
    let filtered = mensagens.filter(e => e.msg.indexOf(param) != -1 || e.title.indexOf(param) != -1 || e.frontend.indexOf(param) != -1 || e.author.indexOf(param) != -1);
    if (filtered.length != 0) {
        update(filtered);
    }     
}




