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
    let inp = document.getElementById("tok");
    inp.value = parametro;
} else {
    window.location = "./";
}