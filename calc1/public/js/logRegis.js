function registrar() {
    let usuario = document.getElementById('usuario').value;
    let password = document.getElementById('password').value;

    axios.post('http://localhost/api/auth/register', {
            email: usuario,
            password: password
        })
        .then((response) => {
            console.log(response);
            const resultado = document.getElementById('resultado');
            let success = response.data.success;
            if (success == 1) {
                resultado.innerHTML = 'Su registro fue exitoso';
            } else if (success == -1) {
                resultado.innerHTML = 'Ocurrio un problema de conexion, vuelva a intentarlo';
            } else {
                resultado.innerHTML = 'Este correo ya esta siendo utilizado';
            }
            resultado.innerHTML += '<br>';
        }, (error) => {
            console.log(error);
        });
}

async function ingresar() {
    let usuario = document.getElementById('usuario').value;
    let password = document.getElementById('password').value;
    let token = '';
    let reqUrl = './calculadora';
    let exist = '';


    await axios.post('http://localhost/api/auth/login', {
            email: usuario,
            password: password
        })
        .then((response) => {
            console.log(response);
            const resultado = document.getElementById('resultado');
            token = response.data.token;
            if (token) {
                console.log("Redirigir");
                exist = 'calculadora';
                window.location = "./calculadora?token=" + token;
            } else {
                console.log("Quedarse");
            }
            //redirigir(token);

        }, (error) => {
            console.log(error);
        });

    let url = "http://localhost/" + exist;
    /*
    await $.ajax({
        type: "GET",
        url: url,
        data: token,
        success: function(data) {
            if (data.redirect) {
                location.href = url;

            } else {
                //$("#resultado").html(data);
            }

        }
    });
*/
    //axios.get('http://localhost/' + exist, { token: token });


    if (token === "") {
        //var req = new XMLHttpRequest();
        //req.setRequestHeader('Authorization', token);
        console.log('Loguearse');
        //$(location).prop('href', './calculadora');
    }
}



function redirigir(token) {
    console.log("Redirigiendo: " + token);
    let reqUrl = './calculadora';
    $.ajax({
        type: "GET",
        url: reqUrl,
        success: function(data) {
            if (data.redirect) {
                // data.redirect contains the string URL to redirect to
                location.href = reqUrl;
            } else {
                // data.form contains the HTML for the replacement form
                //$("#myform").replaceWith(reqUrl);
            }
        }
    });
}