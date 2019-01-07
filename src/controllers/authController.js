const controller = {};
const mysql = require('mysql');


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345',
    port: 3306,
    database: 'APP',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

controller.index = (req, res) => {
    let error_message = req.flash('error')[0];
    res.locals.error_message = error_message;
    res.render('auth/index');
}
controller.facebook = (profile, done) => {
    let nombre = profile._json.name;
    let user = profile._json.name.split(' ').join('.');
    let token = profile._json.id;
    ValidateAccountFacebook(nombre, user, token, done);
}

function ValidateAccountFacebook(nombre, user, token,done){
    const sql = `INSERT INTO usuario(nombre, usuario, token) VALUES ('${nombre}','${user}','${token}')`;
    connection.query(`select * from usuario where token = '${token}'`,function(err,rows){
        if(rows.length == 1){
            return done(null, user);
        }else{
            connection.query(sql, (err, account) => {
                ValidateAccountFacebook(nombre, user, token, done);
            })
        }
    });
}

controller.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}
controller.home = (req, res) => {
    res.render('home/index');
}

controller.login = (user, pass,done) => {
    connection.query(`select * from usuario where usuario = '${user}' AND password = '${pass}'`,function(err,rows){	

        if(rows.length == 1){
            return done(null, user);
        }else{
            return done(null, false,{message: `El Usuario o Password Incorrectos`});
        }
    });
}

controller.signup = (req, res) => {
    res.render('auth/signup');
}

controller.createUser = (req, res) => {
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const password = req.body.password;

    req.getConnection((err, connection) => {
        const sql = `INSERT INTO usuario(nombre, usuario, password) VALUES ('${nombre}','${usuario}','${password}')`;
        req.getConnection((err, conn) => {
            conn.query(`SELECT * FROM usuario WHERE usuario = ${usuario}`, (err, rows) => {
                if (rows === null){
                    
                    res.send("Aqui");
                    return false;
                }else{
                    const query = connection.query(sql, (err, customer) => {
                        //res.render('auth/index');
                        res.send("Hola");
                    })
                }
            });
        });
    })
}
module.exports = controller;