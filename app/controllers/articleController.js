var cheerio = require('cheerio');
var fs = require('fs-extra');

var process = function(rawHtml){
    var $ = cheerio.load(rawHtml);
    $("script[src]").filter(function(i,v){
        return v.attribs.src.substr(0,4) !== "http" && v.attribs.src.substr(0,4) !== "data"
    }).each(function(i,v){
        var fromFile = global.appRoot + "/public/tmpl/" + v.attribs.src;
        var toFile = global.config.local_static_server.root + v.attribs.src;
        fs.copy(fromFile, toFile, function(err){
            if (err) console.log(err)
        })
    })
    $("link[href]").filter(function(i,v){
        return v.attribs.href.substr(0,4) !== "http"
    }).each(function(i,v){
        var fromFile = global.appRoot + "/public/tmpl/" + v.attribs.href;
        var toFile = global.config.local_static_server.root + v.attribs.href;
        fs.copy(fromFile, toFile, function(err){
            if (err) console.log(err)
        })
    })
    return $.html();
}

module.exports = {
    publish:function(req,res) {
        var dir = global.config.local_static_server.root + global.config.local_static_server.html_dir
        var d = new Date();
        var filename = req.body.filename
        var fs = require('fs')
        fs.writeFile(dir + filename, process(req.body.data) , function (err) {
            res.send(err)
        });
        res.setHeader('Content-Type', 'application/json')
        res.send({result:'success'})
    },
    show:function(req,res) {
        var dir = global.config.local_static_server.root + global.config.local_static_server.html_dir

        var d = new Date();
        var filename = [d.getDate() ,d.getMonth(), d.getFullYear()].join("-") + ".html";

        var fs = require('fs')
        fs.writeFile(dir + "\\" + filename, req.body.data , function (err) {
            res.send(err)
        });
        res.setHeader('Content-Type', 'application/json')
        res.send({result:'success'})
    }
}