
/*
 * GET home page.
 */

exports.index = exports.desktop = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.device = function(req, res){
    res.render('device');
};