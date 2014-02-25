
/*
 * GET home page.
 */

exports.index = exports.desktop = function(req, res){
  res.render('desktop');
};

exports.device = function(req, res){
    res.render('device');
};

exports.webgl = function(req, res){
    res.render('webgl');
};