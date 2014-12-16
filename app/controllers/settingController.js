var settingFile = global.appRoot + '/config/setting.json'
module.exports = {
    read:function(req,res) {
        var fs = require('fs')
        var json = require(settingFile);
        res.setHeader('Content-Type', 'application/json')
        res.send(json)
    },
    save:function(req,res){
        var json = require(settingFile);
        for(var k in req.body){
            json[k] = req.body[k]
        }
        var fs = require('fs')
        fs.writeFile(settingFile, JSON.stringify(json,null,"   ") , function (err) {
            res.send("error")
        });
        res.send("success")
    },
    get:function(prop){
        var json = require(settingFile);
        return json[prop];
    }
}

