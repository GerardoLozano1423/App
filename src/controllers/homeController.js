const controller = {};


controller.menu = (req, res) => {
    res.render('menu');
}

controller.ubicacion = (req, res) => {
    res.render('home/ubicacion');
}

module.exports = controller;