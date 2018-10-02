#!/usr/bin/env node
const [, , ...args] = process.argv
let pathEntered = `${args[0]}`;
const mdLinks = require('./index');

let options = {
    validate: false,
    stats: false
};

args.forEach(index => {
    if (index === '--validate' || index === '--v') {
        options.validate = true;
    }
    if (index === '--stats' || index === '--s') {
        options.stats = true;
    }
});




mdLinks(pathEntered, options).then(data => {

    if (options.validate && !options.stats) {
        console.log(data);
    } else if (options.stats && !options.validate) {
        console.log('Total: ' + data[0]);
        console.log('Unique:' + data[1]);
    } else if (options.validate && options.stats) {
        console.log('Total: ' + data[0]);
        console.log('Unique: ' + data[1]);
        console.log('Broken: ' + data[2]);
    } else {
        console.log(data);
    }

});

