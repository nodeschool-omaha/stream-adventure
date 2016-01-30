var split = require('split');
var through = require('through2');

var odd = true;
process.stdin
    .pipe(split())
    .pipe(through(function (line, encoding, next) {
        if (odd) {
            this.push(line.toString().toLowerCase() + '\n');
        } else {
            this.push(line.toString().toUpperCase() + '\n');
        }
        odd = !odd;
        next();
    })).pipe(process.stdout);