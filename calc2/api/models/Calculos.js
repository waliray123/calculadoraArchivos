const redis = require('redis');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retry_strategy: () => 1000
});


module.exports.setHistorial = (resultado, posicion) => {
    console.log("Guardar historial: " + resultado);
    //redisClient.hset('ultimo', 'ult', resultado);
    let pos = 'pos' + posicion;

    return new Promise(
        (resolve, reject) => {
            resolve(redisClient.hset('historial', pos, resultado))
        }
    )

}

module.exports.getHistorial = () => {
    console.log("Obteniendo Ultimo");
    return new Promise((resv, rej) => {
        redisClient.hgetall('historial', (err, reply) => {
            console.log("Obtenido: " + reply);
            resv(reply);
        });
    })

}


module.exports.setUltimo = (resultado, posicion) => {
    console.log("Guardar Ultimo: " + resultado);
    //redisClient.hset('ultimo', 'ult', resultado);


    return new Promise(
        (resolve, reject) => {
            console.log("Insertando");
            resolve(redisClient.hset('ultimo', 'ult', resultado, 'posicion', posicion))
        }
    )

}


module.exports.getUltimo = () => {
    console.log("Obteniendo Ultimo");
    return new Promise((resv, rej) => {
        redisClient.hgetall('ultimo', (err, reply) => {
            console.log("Obtenido: " + reply);
            resv(reply);
        });
    })

}