var express = require('express');

//global
global.config = require('./config/setting.json');
global.appRoot = require('path').normalize(__dirname )

var app = express();

require('./config/express')(app);

app.listen(global.config.port);

// start local static server
var localStaticServer = express();
localStaticServer.use(express.static(global.config.local_static_server.root));
localStaticServer.listen(global.config.local_static_server.port);

