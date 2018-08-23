const validarUrl = require('../index');

describe('validarUrl', () => {

  it('validarUrl, debería ser una función', () => {
    expect(typeof (validarUrl)).toBe('function');
  });

  it('Debería validar la url http://ejemplo.com y mostrar el siguiente texto: Es una url absoluta ', () => {
    expect(validarUrl('http://ejemplo.com')).toBe('Es una url absoluta');
  });

  it('Debería validar la url /directorio/prueba.txt y mostrar el siguiente texto: Es una ruta relativa', () => {
    expect(validarUrl('/directorio/prueba.txt')).toBe('Es una ruta relativa');
  });

  it('Debería validar la url C:\Users\MaricruzJosefina\Downloads\lim-2018-05-bc-core-pm-socialnetwork-master y mostrar el siguiente texto: Es una ruta relativa', () => {
    expect(validarUrl('C:\Users\MaricruzJosefina\Downloads\lim-2018-05-bc-core-pm-socialnetwork-master')).toBe('Es una ruta relativa');
  });

});

