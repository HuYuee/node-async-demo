var async = require('async');
var path = require('path');
var fs = require('fs');
var envPath = process.cwd();
var dir = path.join(envPath, '/src')
async.auto({
    fun1:function(callback){
        fs.readdir(dir, function(err, kits) {
            var newkits = kits.filter(function(kit) {
                return /\.md$/.test(kit)
            })
            callback(null, kits);
        })
    },
    fun2:["fun1", function(callback, results){
        var kits = results.fun1;

        async.mapSeries(kits, function(kit, callback){
            var path = dir + '/' + kit;
            var data = fs.readFileSync(path, 'utf-8')
            callback(null, data);

        }, function(err, results){
            results = results.join('');
            console.log(results);

        });
    }]
})
