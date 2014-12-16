module.exports = {
    publish:function(req,res) {
        var dir = require('./settingController').get("generated_html_dir");
        var fs = require('fs')
        fs.writeFile(dir + "/test.html", req.body.data , function (err) {
            res.send(err)
        });
        res.setHeader('Content-Type', 'application/json')
        res.send({result:'success'})
    }
}