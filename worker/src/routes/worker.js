const router = require('express').Router();
const calculos = require('./Calculos');

router.get('/', (req, res) => {
    res.status(201).json({ prueba1: "pruebaGET" });
});

router.get('/sumar/', (req, res) => {
    const { num1, num2 } = req.query;
    const resultado = Number.parseInt(num1) + Number.parseInt(num2);
    console.log('La suma es: ' + resultado);

    //const valUltimo = calculos.getUltimo();
    //calculos.setUltimo(resultado);
    //console.log("ValUltimo: " + valUltimo);



    res.status(201).json({ result: resultado });
});

router.get('/restar/', (req, res) => {
    const { num1, num2 } = req.query;
    const resultado = Number.parseInt(num1) - Number.parseInt(num2);
    console.log('La resta es: ' + resultado);
    calculos.setCalculo(resultado);
    res.status(201).json({ result: resultado });
});

router.get('/multiplicar/', (req, res) => {
    const { num1, num2 } = req.query;
    const resultado = Number.parseInt(num1) * Number.parseInt(num2);
    console.log('La multiplicacion es: ' + resultado);
    calculos.setCalculo(resultado);
    res.status(201).json({ result: resultado });
});

router.get('/dividir/', (req, res) => {
    const { num1, num2 } = req.query;
    if (num2 != 0) {
        const resultado = Number.parseInt(num1) / Number.parseInt(num2);
        console.log('La division es: ' + resultado);
        calculos.setCalculo(resultado);
        res.status(201).json({ result: resultado });
    } else {
        console.log('Error al dividir por cero: ');
        res.status(500).json({ result: "error", tipo: "500" });
    }
});


module.exports = router;