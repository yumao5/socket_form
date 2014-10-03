module.exports = function(){
  var express = require('express');
  var app = express();
  var i18n = require('i18n');
  var path = require('path');

  app.use(i18n.init);
  app.use(express.static(path.join(__dirname, '../public')));

  app.get('', function(req, res){
	  res.render('form') 
  });

  return app;
}();