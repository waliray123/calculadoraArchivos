const redis = require('redis');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retry_strategy: () => 1000
});

module.exports.setCalculo = (resultado) => {
    return new Promise(
        (resolve, reject) => {
            console.log("guardar: " + resultado);
            resolve(redisClient.hset('calculo', resultado))
        }
    )
}

module.exports.getCalculos = () => {
    console.log("Obteniendo Historial");
    return redisClient.hgetall('calculo', function(err, result) {
        if (err) console.log(err);
        else {
            console.log(result);
            return result;
        }
    });
    /*
    return new Promise(
        (resolve, reject) => {
            redisClient.hgetall('calculo', function(err, value) {
                console.log("Obteniendo Historial");
                if (err) {
                    console.log(err);
                } else {
                    console.log("Historial Obtenido");
                    console.log(value);
                    resolve(value);
                }
            })
        }
    )
    */
}

module.exports.setUltimo = (resultado) => {
    console.log("Guardar Ultimo: " + resultado);
    redisClient.hset('ultimo', 'ult', resultado);

    /*
        return new Promise(
            (resolve, reject) => {
                console.log("Insertando");
                resolve(redisClient.hset('ultimo', 'ult', resultado, 'val', '0'))
            }
        )
        */
}


module.exports.getUltimo = () => {
    console.log("Obteniendo Ultimo");
    redisClient.hgetall('ultimo', (err, reply) => {
        console.log("Obtenido: " + reply);
        return reply;
    });

    /*
    return new Promise((resv, rej) => {
        redisClient.hget('ultimo', 'ult', (err, reply) => {
            console.log("Obtenido: " + reply);
            resv(reply);
        });
    })
    */
}