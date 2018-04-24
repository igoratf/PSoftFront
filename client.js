var mural = document.getElementById("mural");
var mensagens = ['Msg1', 'Msg2', 'Msg3', 'Msg4'];

var formVisibility = true;


function update() {
    var items = mensagens.map(e => `<li id="msg">` + e + `</li>`).join("\n");
console.log(items);
    this.mural.innerHTML = `<ul>` + items;
}

update();


function showForm() {
    var myForm = document.getElementById('myForm');
     console.log(formVisibility);
    formVisibility = !formVisibility;
    if (formVisibility === true) {
        myForm.style.visibility = '';
    } else {
        myForm.style.visibility = 'hidden';
    }
    console.log(myForm.style.visibility);
}

function onSubmit() {
    var msg = document.getElementById('msgTextArea').value;
    mensagens.push('' + msg);
    console.log(mensagens);
    this.update();
}
