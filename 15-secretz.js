var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var concat = require('concat-stream');

var parser = tar.Parse();
parser.on('entry', function (e) {
    if (e.type !== 'File') return;
    
    var h = crypto.createHash('md5', { encoding: 'hex' });
    e.pipe(h).pipe(concat(function (hash) {
        console.log(hash + ' ' + e.path);
    }));
});

var cipher = process.argv[2];
var passphrase = process.argv[3];
process.stdin
        .pipe(crypto.createDecipher(cipher, passphrase))
        .pipe(zlib.createGunzip())
        .pipe(parser);