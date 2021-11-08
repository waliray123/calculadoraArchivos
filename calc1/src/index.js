const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
//set views
app.set('views', './views');
app.set('view engine', 'ejs');

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

app.get('/calculadora', (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
    res.status(404).sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/historial', (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
    res.status(404).sendFile(path.join(__dirname, '../views/historial.html'));
});

app.get('/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/register', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../views/register.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../views/404.html'));

});


app.listen(3000, () => console.log('Escuchando en el puerto 3000'));