const controller = {};

controller.isValidUser = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/")
    }
}

module.exports = controller;