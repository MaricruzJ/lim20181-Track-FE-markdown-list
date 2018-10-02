const path = require('path');
const fs = require('fs');
const request = require('request');

let promises = [];
let total = 0;
let unique = 0;
let broken = 0;

const convertPathToAbsolute = (url) => {
    return path.resolve(url);
}

const validatePath = (url) => {
    return fs.existsSync(url);
};


const statPromise = (url) => {
    return new Promise((resolve, reject) => {
        fs.stat(url, (err, stats) => {
            if (err) return reject(err);
            return resolve(stats);
        })
    })
}

const readdirPromise = (url) => {
    return new Promise((resolve, reject) => {
        fs.readdir(url, (err, files) => {
            if (err) return reject(err);
            return resolve(files);
        })
    })
}

const getPaths = (url) => {
    //fs.stat objeto que proporciona información sobre un archivo.
    return statPromise(url)
        .then(stats => {
            if (stats.isFile()) {
                return [url];
            } else if (stats.isDirectory()) {
                return readdirPromise(url).then(files => {
                    return files.map(file => {
                        return getPaths(path.resolve(url + '/' + file));
                    });
                }).then(promises => {
                    return Promise.all(promises);
                }).then(files => {
                    let array = [];
                    files.forEach(file => {
                        array = array.concat(file);
                    });

                    return array;
                });
            }
        });
};

const getFilesMd = (urlFile) => {
    return readContentMd(urlFile).then(datas => {
        return datas;
    });

}

const readContentMd = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) return reject(err);
            return resolve(getLinksMd(data, file));
        });
    })
}

const getLinksMd = (data, urlFile) => {
    let arr = [];
    const lines = data.split('\n');
    const expReg = /(\b(http?|https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    lines.forEach(line => {
        let obj = {};
        let urls = line.match(expReg);
        if (urls) {
            obj.href = urls[0];
            obj.text = line.substring(line.indexOf('[') + 1, line.indexOf(']'));
            obj.file = urlFile;
            arr.push(obj);
        }
    });
    return arr;
}

const checkLink = (iterator) => {
    total++;
    return new Promise((resolve, reject) => {
        request(iterator.href, (error, response) => {

            if (error) {
                iterator.status = 404;
                iterator.result = 'fail';
                resolve(iterator)
            } else {
                iterator.status = response.statusCode;
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    iterator.result = 'ok';
                } else {
                    iterator.result = 'fail';
                }
                resolve(iterator)
            }
        });
    })
}

const validateLinks = (arrayObjects) => {
    return new Promise((resolve, reject) => {
        let arr = arrayObjects.map(link => {
            return checkLink(link)
        })

        Promise.all(arr).then(res => {
            resolve(res)
        }).catch(e => reject(e))
    })
}

getBrokens = (data) => {
    let broken = 0;
    data.forEach(x => {
        if (x.result === 'fail') broken++;
    })
    return broken;
}

const mdLinks = (url, options) => {

    if (!path.isAbsolute(url)) {
        url = convertPathToAbsolute(url);
    }
    if (validatePath(url)) {
        return getPaths(url).then(array => {

            array.forEach(url => {
                const expReg = /\.(md|mkdn|mdown|markdown?)$/i;
                if (expReg.test(path.extname(url))) {
                    promises.push(getFilesMd(url).then(data => {
                        return data;
                    }));
                }
            });

            return Promise.all(promises).then((data) => {
                let array = [];
                data.forEach(file => {
                    array = array.concat(file);
                });

                let arrLinks = [];
                array.map((obj) => {
                    arrLinks.push(obj.href);
                })

                if (!options.validate && !options.stats) {
                    return array;
                } else if (options.stats && !options.validate) {
                    return [array.length, new Set(arrLinks).size]
                }

                return validateLinks(array).then(result => {
                    if (options.validate && options.stats) {
                        return [array.length, new Set(arrLinks).size, getBrokens(result)];
                    } else {
                        return result;
                    }
                });
            });
        });
    } else {
        return 'La url ingresada no existe'
    }
}

module.exports = mdLinks;