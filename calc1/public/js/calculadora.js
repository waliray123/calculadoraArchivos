function sumar() {
    let num1 = document.getElementById('txtnum1').value;
    let num2 = document.getElementById('txtnum2').value;
    let resultado = obtenerResultado(num1, num2, 'sumar');
    let historico = 'sumar' + num1 + '+' + num2;

    //mostrarResultado(resultado, historico);
}

function restar() {
    let num1 = document.getElementById('txtnum1').value;
    let num2 = document.getElementById('txtnum2').value;

    let resultado = obtenerResultado(num1, num2, 'restar');
    let historico = 'restar' + num1 + '+' + num2;
    //mostrarResultado(resultado, historico);
}

function multiplicar() {
    let num1 = document.getElementById('txtnum1').value;
    let num2 = document.getElementById('txtnum2').value;

    let resultado = obtenerResultado(num1, num2, 'multiplicar');
    let historico = 'mult' + num1 + '+' + num2;
    //mostrarResultado(resultado, historico);
}

function dividir() {
    let num1 = document.getElementById('txtnum1').value;
    let num2 = document.getElementById('txtnum2').value;

    let resultado = obtenerResultado(num1, num2, 'dividir');
    let historico = 'divi' + num1 + '+' + num2;
    //mostrarResultado(resultado, historico);
}

function mostrarResultado(resultado, historico) {

    let txtResultado = document.getElementById('resultado');
    txtResultado.textContent = resultado;

    let txtHistorico = document.getElementById('historico');
    txtHistorico.textContent = historico;
}


function getHistorial() {
    let token = document.getElementById('tok').value;
    window.location = "./historial?token=" + token;

    /*
    let token = document.getElementById('tok').value;
    let aut = token;
    console.log(aut);
    axios.get('http://localhost/api/historial', {
            headers: {
                'Authorization': aut
            }
        })
        .then((response) => {
            console.log("Se realiza la busqueda");
            console.log(JSON.stringify(response.data.historial));
            //mostrarResultado(response.data.resultado, "");
            //return response.data.resultado;
        }, (error) => {
            console.log(error);
        });
        */
}

function obtenerResultado(num1, num2, operador) {
    let token = document.getElementById('tok').value;
    let aut = token;
    console.log(aut);
    axios.post('http://localhost/api/operacion', {
            num1: num1,
            num2: num2,
            op: operador
        }, {
            headers: {
                'Authorization': aut
            }
        })
        .then((response) => {
            //console.log(response);
            console.log(response.data.resultado);

            mostrarResultado(response.data.resultado, response.data.ultimo);

            //return response.data.resultado;
        }, (error) => {
            console.log(error);
        });
    // return null;
}