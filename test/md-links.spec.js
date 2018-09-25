const validarUrl = require('../index');

describe('validarUrl', () => {

  it('validarUrl, debería ser una función', () => {
    expect(typeof (validarUrl)).toBe('function');
  });

  it('Debería validar la url D:/Data/Final/Infrastructure.gdb/Streets y mostrar el siguiente texto: Es una url absoluta ', () => {
    expect(validarUrl('D:/Data/Final/Infrastructure.gdb/Streets')).toBe('Es una url absoluta');
  });

  it('Debería validar la url ..\redlands.mdb\streets y mostrar el siguiente texto: Es una ruta relativa', () => {
    expect(validarUrl('..\redlands.mdb\streets')).toBe('Es una ruta relativa');
  });

  it('Debería validar la url C:\Users\MaricruzJosefina\Downloads\lim-2018-05-bc-core-pm-socialnetwork-master y mostrar el siguiente texto: Es una ruta relativa', () => {
    expect(validarUrl('C:\Users\MaricruzJosefina\Downloads\lim-2018-05-bc-core-pm-socialnetwork-master')).toBe('Es una ruta relativa');
  });

});

