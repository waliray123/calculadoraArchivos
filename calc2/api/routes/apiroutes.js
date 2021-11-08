const express = require('express');
const calculos = require('../models/Calculos');

const router = express.Router();
router.use(express.json());

const authenticated = require('../auth/chktoken');

const axios = require('axios');

const workerhost = process.env.WORKER_HOST;
const workerport = process.env.WORKER_PORT;


router.get('/prueba', async(req, res) => {
    const { num1, num2, op } = req.body;

    console.log("revisando num1 " + num1);

    console.log(workerhost + ':' + workerport + '/math/');
    await axios.get('http://' + workerhost + ':' + workerport + '/math/', { port: Number.parseInt(workerport) })
        .then(response => {
            console.log(response.data);
            res.status(201).json(response.data);
        })
        .catch(error => {
            console.log("error");
            console.log(error);
            res.send("funciono");
        });

    //  console.log("funciono");
    // res.send("funciono");
});


/*
router.get('/historial', authenticated.checkToken, (req, res) => {
    console.log('entrando a historial');
    res.status(201).json({ historial: ['1+1=2', '5*6=25'] });
});
*/


router.get('/historial', authenticated.checkToken, async(req, res) => {
    console.log('entrando a historial');
    const hist = await calculos.getHistorial();
    res.status(201).json({ historial: hist });
});

router.post('/operacion', authenticated.checkToken, async(req, res) => {
    const { num1, num2, op } = req.body;

    console.log("revisando num1 " + num1);
    console.log("revisando num2 " + num2);

    const params = {
        num1: num1,
        num2: num2
    };

    console.log('http://' + workerhost + ':' + workerport + '/math/' + op + "?num1=" + num1 + "&num2=" + num2);
    let resu = 0;

    await axios.get('http://' + workerhost + ':' + workerport + '/math/' + op + "?num1=" + num1 + "&num2=" + num2, { port: Number.parseInt(workerport), params })
        .then(response => {
            console.log(response.data);
            resu = response.data.result
                //res.json({ operacion: `${num1}  ${op}  ${num2}=${response.data.result}`, resultado: response.data.result }).status(201);
        })
        .catch(error => {

            console.log(error);
            res.send("funciono");
        });

    console.log("Obtener el Ultimo");
    const ult = await calculos.getUltimo();
    console.log("ultimo: " + ult);
    let posicion = 0;
    if (ult) {
        posicion = parseInt(ult.posicion) + 1;
        console.log("Posi " + posicion);
    }

    console.log("Guardar: " + resu);
    await calculos.setUltimo(resu, posicion);
    await calculos.setHistorial(resu, posicion);

    console.log("Guardado: " + resu);
    res.json({ operacion: `${num1}  ${op}  ${num2}=${resu}`, resultado: resu, ultimo: ult.ult }).status(201);

});





module.exports = router;