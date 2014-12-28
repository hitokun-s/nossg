var cheerio = require('cheerio');
var fs = require('fs-extra');// to use 'copy' method

var process = function(rawHtml){
    var $ = cheerio.load(rawHtml);

    // copy external resource files
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
    //remove devonly element
    $("script.devonly").remove()
    return $.html();
}

// each action name should be included in URL ex. "/article/savemd"
module.exports = {
    savemd:function(req,res){
        var dir = global.config.local_static_server.root + global.config.local_static_server.markdown_dir
        var filename = req.body.filename
        var result = fs.writeFileSync(dir + filename, req.body.data);
        res.setHeader('Content-Type', 'application/json')
        res.send({result:'success'})
    },
    publish:function(req,res) {
        var dir = global.config.local_static_server.root + global.config.local_static_server.html_dir
        var filename = req.body.filename
        fs.writeFile(dir + filename, process(req.body.data) , function (err) {
            res.send(err)
        });
        res.setHeader('Content-Type', 'application/json')
        res.send({result:'success'})
    },
    list:function(req,res){
        var files = fs.readdirSync(global.config.local_static_server.root + global.config.local_static_server.markdown_dir);
        res.setHeader('Content-Type', 'application/json')
        res.send(files)
    },
    get:function(req,res){
        var file = fs.readFileSync(global.config.local_static_server.root
            + global.config.local_static_server.markdown_dir
            + req.query.filename, 'utf8');
        res.setHeader('Content-Type', 'application/json')
        res.send({data:file})
    },
    getInfo:function(req,res){
        var data
        try {
            data = fs.readFileSync(global.config.local_static_server.root
                + global.config.local_static_server.info_dir
                + req.query.filename + ".json", 'utf8');
        }catch(e){
            // not found
        }
        res.setHeader('Content-Type', 'application/json')
        res.send(data)
    },
    setInfo:function(req,res){
        var dir = global.config.local_static_server.root + global.config.local_static_server.info_dir
        var filename = req.body.filename + ".json"
        var result = fs.writeFileSync(dir + filename, JSON.stringify(req.body, null, "   "));
        res.setHeader('Content-Type', 'application/json')
        res.send({result:'success'})
    }
}