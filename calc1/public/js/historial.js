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

var parametro = findGetParameter("token");
if (parametro) {

} else {
    window.location = "./";
}


let aut = parametro;
console.log(aut);
axios.get('http://localhost/api/historial', {
        headers: {
            'Authorization': aut
        }
    })
    .then((response) => {
        console.log("Se realiza la busqueda");
        //console.log(JSON.stringify(response.data.historial));
        mostrarDatos(response.data.historial);

        //mostrarResultado(response.data.resultado, "");
        //return response.data.resultado;
    }, (error) => {
        console.log(error);
    });

function mostrarDatos(datos) {
    console.log("Mostrando Datos");
    console.log(datos);
    var table = document.getElementById("tablaDatos");
    const largo = parseInt(getLengthOfObject(datos));
    var pos = 'pos';
    for (var j = 0; j < largo; j++) {
        pos = 'pos' + j;
        console.log("dato: " + datos[pos]);
        var row = table.insertRow(0);
        row.innerHTML = "<td>" + datos[pos] + "</td>";
    }





}

function getLengthOfObject(obj) {
    let lengthOfObject = Object.keys(obj).length;
    console.log(lengthOfObject);
    return lengthOfObject;
}