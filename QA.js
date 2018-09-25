/* const func = () => {
    return new Promise((resolve, reject) => {
        console.log('antes de resolve arr')
        setTimeout(() => {
            resolve([
                {
                    href: 'href',
                    text: 'text',
                    file: 'file'
                }
            ])
        }, 1000)
    })
}

const a = func().then((arr) => {
    console.log('dentro de resolve')
    console.log(arr)
})

const funcAsync = (url) => {
    return new Promise((resolve, reject) => {
        console.log('antes de resolve fetch')
        fetch(url).then(response => {
            return response.json()
        }).then((json) => {
            resolve(json)
        }).catch((error) => {
            reject(error)
        })

    })
}

const b = funcAsync('https://gist.githubusercontent.com/planetoftheweb/98f35786733c8cccf81e/raw/f3dad774ed1fe20b36011b1261bb392ee759b867/data.json').then((json) => {
    console.log('dentro de resolve ya tengo los artistas')
    console.log(json)
}) */


const validarUrl = (path) => new Promise((resolve, reject) => {

    fs.readdir(path, (err, files) => {

        if(err) return reject(err);
        resolve(files);

    })

})

validarUrl(process.cwd());