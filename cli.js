#!/usr/bin/env node
const [, , ...args] = process.argv
let pathEntered = `${args[0]}`;
const mdLinks = require('./index');
options = {
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

    if (!options.validate && !options.stats)
        console.log(data);

    if (options.stats){
        console.log('Total: ' + data.length);
        console.log('Unique: ');
    }

});