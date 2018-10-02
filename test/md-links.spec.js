const mdLinks = require('../index');

let options = {
  validate: false,
  stats: false
};

describe('mdLinks', () => {

  test('mdLinks, debería ser una función', () => {
    expect(typeof (mdLinks)).toBe('function');
  });

  test('Debería de devolver un mensaje ', () => {
    expect(mdLinks('D:\Users')).toBe('La url ingresada no existe');
  });

  

  test('Debería de permitir ingresar una ruta y devolver un enlace, el texto y la url del archivo que lo contiene', () => {
    return mdLinks('C:\Users\MaricruzJosefina\Desktop\prueba-X', options).then(data => {
      expect(data[0].href).toBe('https://nodejs.org/en/');
      expect(data[0].text).toBe('Node.js');
      expect(data[0].file).toBe('C:\\Users\\MaricruzJosefina\\Desktop\\prueba-X\\archivo1.md');
    });
  });

  test('Debería...', () => {
    options = {
      validate: true,
      stats: false
    };
    return mdLinks('C:\Users\MaricruzJosefina\Desktop\prueba-X', options).then(data => {
      expect(data[0].href).toBe('https://nodejs.org/en/');
      expect(data[0].text).toBe('Node.js');
      expect(data[0].file).toBe('C:\\Users\\MaricruzJosefina\\Desktop\\prueba-X\\archivo1.md');
      expect(data[0].status).toBe('200');
      expect(data[0].result).toBe('ok');
    });
  });

  test('Debería...', () => {
    options = {
      validate: false,
      stats: true
    };
    return mdLinks('C:\Users\MaricruzJosefina\Desktop\prueba-X', options).then(data => {
      expect(data[0]).toBe('7');
      expect(data[1]).toBe('3');
    });
  });

  test('Debería...', () => {
    options = {
      validate: true,
      stats: true
    };
    return mdLinks('C:\Users\MaricruzJosefina\Desktop\prueba-X', options).then(data => {
      expect(data[0]).toBe('7');
      expect(data[1]).toBe('3');
      expect(data[2]).toBe('0');
    });
  });


});
