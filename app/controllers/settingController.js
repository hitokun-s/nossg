var settingFile = global.appRoot + '/config/setting.json'
module.exports = {
    read:function(req,res) {
        res.setHeader('Content-Type', 'application/json')
        res.send(global.config)
    },
    save:function(req,res){
        var json = req.body
        global.config = json
        var fs = require('fs')
        fs.writeFile(settingFile, JSON.stringify(json,null,"   ") , function (err) {
            res.send("error")
        });
        res.send("success")
    },
    get:function(prop){
        return global.config[prop];
    }
}

