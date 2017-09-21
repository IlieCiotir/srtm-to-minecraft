const fs = require('fs');
const path = require('path');
const tiff = require('tiff');
var jsonfile = require('jsonfile')

let file = process.argv[2];

let content = fs.readFileSync(path.join(__dirname, file));

let result = tiff.decode(content);

try {
    fs.mkdirSync('../output');
} catch (err) {
    if (err.code !== 'EEXIST') throw err;
}

jsonfile.writeFile('../output/config.json', {
    prefix: 'test',
    lines: result[0].height
});

let line = [];
let lines = 0;

result[0].data.forEach((value, index) => {
    line.push(Math.round(value / 10));
    if (index != 0 && (index + 1) % result[0].width === 0) {
        console.log(`started writing ${lines} out of ${result[0].height}`)
        jsonfile.writeFile(`../output/test_${lines}.json`, line,
            function (err) {
                if (err) {
                    console.log(err);
                }
            });
        lines += 1;
        line = [];
    }
});


console.log(result[0].width);
console.log(result[0].height);
console.log(lines);