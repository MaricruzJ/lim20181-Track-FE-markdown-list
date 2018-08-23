#!/usr/bin/env node
const [, , ...args] = process.argv
console.log(`${args}`)

const regex = new RegExp('^(?:[a-z]+:)?//', 'i');
const abs = 'Es una url absoluta';
const rel = 'Es una ruta relativa';
const path = require('path');
const fs = require('fs');


const validarUrl = (urlString) => {
    //console.log(`${urlString}`);
    /*  if (path.isAbsolute(`'${urlString}'`)) {
         console.log('Es una ruta absoluta');
         return abs;
     } */
    if (regex.test(urlString)) {
        console.log('Es una ruta absoluta');
        //directoryOrFile(urlString);
        return abs;
    } else {
        console.log('Es una ruta relativa');
        return rel;
    }
    // cuando sea relativo, => hacer que sea absoluto resolve()  o isabsolute()
    // retorna url absoluta
}
module.exports = validarUrl;

validarUrl(args);

const directoryOrFile = (url) => {
    //fs.stat objeto que proporciona información sobre un archivo.
    fs.stat(url, (err, stats) => {

        if (stats.isFile()) {
            console.log('archivo');
            // Aquí se obtendrán los que son md
            //getLinks();
        } else if (stats.isDirectory()) {
            console.log('directorio');
            // Lee el contenido de un directorio
            fs.readdir(stats, (err, files) => {
                // Aquí con de entre los archivos se obtendrán los archivos que tengan extensión md, luego los paso a getLinks();
                //getLinks();
            });
        }
    });

    // si es directorio recorrer hasta encontrar files => 
    // filtrar si es markdown 
    // retorna archivos markdown filtrados
};

const getLinks = (file) => {
    // Leer el archivo
    // filtrar los links
}


/* const mdLinks = (path, options) => {

} */
