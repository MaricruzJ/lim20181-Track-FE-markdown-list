#!/usr/bin/env node

const [, , ...args] = process.argv
console.log(`hello world! ${args}`)

const regex = new RegExp('^(?:[a-z]+:)?//', 'i');
const abs = 'Es una url absoluta';
const rel = 'Es una ruta relativa';


const validarUrl = (urlString) => {
    if (regex.test(urlString) === true) {
        console.log('Es una ruta absoluta');
        return abs;
    }
    console.log('Es una ruta relativa');
    return rel;
}
module.exports = validarUrl;


const path = (url) => {
    // validar si es relativo o absoluto
    // ver regex 
    // cuando sea relativo, => hacer que sea absoluto resolve()  o isabsolute()
    // retorna url absoluta
}

const fileOrDirectory = () => {
    // validar si es directorio o file
    // si es directorio recorrer hasta encontrar files => 
    // filtrar si es markdown => extname() ver basename() ver format() fs.stat()
    // paso previo
    // retorna archivos markdown filtrados
}

const mdLinks = (path, options) => {

}


validarUrl(args);