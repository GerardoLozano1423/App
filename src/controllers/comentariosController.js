const controller = {};

controller.index = (req, res) =>{
    res.render('home/calificar');
}

controller.guardarCalificacion = (req, res) =>{
    var id_servicio = req.query.id_servicio;
    var estrellas = req.query.estrellas;
    var comentario = req.query.comentario;
    var sql = ""; 

    if(id_servicio != undefined){
        sql = `INSERT INTO calificacion(id_servicio, calificacion, comentario) VALUES (${id_servicio},${estrellas},'${comentario}')`;
    }else{
        sql = `INSERT INTO calificacion(calificacion, comentario) VALUES (${estrellas},'${comentario}')`;
    }
    console.log(sql);
    req.getConnection((err, conn) => {
        conn.query(sql, (err, data) => {
            res.send("1");
        })
    });
}


module.exports = controller;