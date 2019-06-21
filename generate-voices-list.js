const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), filelist)
            : filelist.concat({
                name: file,
                path: path.join(dir, file),
                //size: fs.statSync(path.join(dir, file)).size
            });
    });
    return filelist;
}

const files = walkSync('wave-tables');

const voices = [];

files.forEach(({ name, path }) => {
    console.log("Found wavetable for " + name);
    let tableData = JSON.parse(
        fs.readFileSync(path, 'utf8')
            .replace(/[\n\t]/g, "")
            .replace(/\'/g, '"')
            .replace(/\,\]/g, ']')
            .replace(/\,\}/g, '}')
    )

    voices.push(name)
    fs.writeFileSync(`voices/${name}.json`, JSON.stringify(tableData));
})

fs.writeFileSync(`voices/index.json`, JSON.stringify(voices));

