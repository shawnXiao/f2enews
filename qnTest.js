var qn = require('qn');
var fs = require('fs');
var path = require('path');

var client = qn.create({
    accessKey: 'bgo9iu3HYai956dd6KVIg9fnaFB4afjj1lj3wqFM',
    secretKey: 'hXJKK_FMlMnEPfmPFPO6_-GVtkXWnKYOvX43KK7d',
    bucket: 'tigerwit01',
    domain: 'https://dn-tigerwit.qbox.me'
});

var options = [{
    folder: "./public/build/",
    extNames:['.png', '.jpg']
},{
    folder: "./public/build/",
    extNames:['.png', '.jpg']
},{
    folder: "./public/build-v2/",
    extNames:['.css']
},{
    folder: "./public/build-v2/",
    extNames:['.js']
}];

options.forEach(function (folderItem) {
    var temptFolder = folderItem.folder;
    var temptExtName = folderItem.extNames;

    walkFolder(temptFolder, function (err, results) {
        results.forEach(function (fileItem) {
            var extName = path.extname(fileItem);
            if (temptExtName.indexOf(extName) >= 0) {
                    var relativePath = path.relative('./public/', fileItem);
                    client.upload(fs.createReadStream(fileItem), {key: relativePath}, function (err, result) {
                        console.log(result)
                    })
            }
        });
    });
});



function walkFolder(startPath, callback) {
    var results = [];
    fs.readdir(startPath, function (err, fileList) {
        if (err) {
            return callback(err);
        }

        var pending = fileList.length;
        if (!pending) {
            return callback(null, results)
        }

        fileList.forEach(function (fileItem) {
            var filePath = startPath + '/' + fileItem;

            fs.stat(filePath, function (err, stat) {
                if (stat && stat.isDirectory()) {

                    walkFolder(filePath, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) {
                            callback(null, results);
                        }
                    });

                } else {
                    results.push(filePath);
                    if (!--pending) {
                        callback(null, results);
                    }
                }

            });

        });
    });
}
