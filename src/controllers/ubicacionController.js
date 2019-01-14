const controller = {};


controller.getEstado = (req, res) => {
    var data = [
        {
            id: 1,
            text: 'Barn owl1',
        },{
            id: 2,
            text: 'Barn owl3',
        }
    ];

    req.getConnection((err, conn) => {
        conn.query("SELECT id_google_maps AS id, nombre FROM estado WHERE habilitado = ?", [1], (err, rows) => {
            res.send(rows);
        });
    });

}

controller.getMunicipios = (req, res) => {
    var idEstado = req.query.id;
    req.getConnection((err, conn) => {
        conn.query("SELECT municipio.id, municipio.nombre FROM municipio INNER JOIN estado ON estado.id = municipio.id_estado WHERE estado.id_google_maps = ?", [idEstado], (err, rows) => {
            res.send(rows);
        });
    });
}

controller.guardarUbicacion = (req, res) => {
    var id_user = 2;
    var estado = req.query.estado;
    var municipio = req.query.municipio;
    var direccion = req.query.direccion;
    var postal_code = req.query.postal_code;
    var country = req.query.country;
    var street_number = req.query.street_number;
    var route = req.query.route;
    var locality = req.query.locality;
    var estadoMAps = req.query.estadoMAps;
    var telefono = req.query.telefono;
    var referencias = req.query.referencias;
    var sql = `INSERT INTO direcciones(id_usuario, direccion, numero_maps, estado, codigo_postal_maps, pais, telefono, referencias) VALUES (${id_user},'${direccion}','${street_number}','${estado}','${postal_code}','${country}','${telefono}','${referencias}')`;
    
    req.getConnection((err, conn) => {
        conn.query(sql, (err, data) => {
            res.send("1");
        })
    });
}

module.exports = controller;