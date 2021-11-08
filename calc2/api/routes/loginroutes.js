const router = require('express').Router();
const crypto = require('crypto');
const users = require('../models/Users');
const authenticated = require('../auth/chktoken');

router.post('/register', async(req, res) => {
    const { email, password } = req.body;
    let existe;
    try {
        existe = await users.exists(email);
    } catch (error) {
        res.status(503).json({ success: -1 })
    }
    if (existe !== 0) {
        res.status(409).json({ success: 0 })
    } else {
        crypto.randomBytes(16, (err, salt) => {
            const newSalt = salt.toString('base64')
            crypto.pbkdf2(password, newSalt, 1000, 64, 'sha1', async(err, key) => {
                const encrypetedPassword = key.toString('base64')
                try {
                    await users.setUser(email, encrypetedPassword, newSalt);
                } catch (error) {
                    res.status(503), json({ success: -1 });
                }
            })
        })
        res.status(201).json({ success: 1 });
    }
});

router.post('/login', async(req, res) => {
    console.log('hola')
    const { email, password } = req.body;
    let user;

    try {
        user = await users.getUser(email);
    } catch (error) {
        res.status(503).json({ mensaje: 'Temporalmente no accesible' })
    }
    if (!user) {
        res.status(409).json({ mensaje: 'Usuario o contraseña incorrecto' });
    } else {
        crypto.pbkdf2(password, user.salt, 1000, 64, 'sha1', (err, key) => {
            const encrypetedPassword = key.toString('base64');
            if (user.password == encrypetedPassword) {
                const token = authenticated.signToken(email);
                req.headers.authorization = token;
                res.status(201).json({ "token": token });
            } else {
                res.status(401).send('Usuario o contraseña incorrecto');
            }
        })
    }
})


module.exports = router;