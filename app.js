const express = require('express');
const app = express();
const fs = require('fs');

app.use('/', express.static(__dirname));


app.listen(3000, function() {
    console.log('Servidor iniciado');
})
