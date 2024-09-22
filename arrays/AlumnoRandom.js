let alumnos = [
    "JULIAN CAMILO BLANDON TABA",
    "TYMUR BOGACH",
    "ADRIAN CABRERA LEONIS",
    "JOSÉ DAVID CASES BERNABÉU",
    "PABLO GARCÍA CELDRÁN",
    "CARLOS LOZANO MARTÍNEZ",
    "JORGE MARTÍNEZ PÉREZ",
    "VICTOR MORA ROSIQUE",
    "CRISTINA MORENO URBÁN",
    "PEDRO MULA MONTESINOS",
    "ALEXANDRO QUIRANTE GARCÍA",
    "ARANTXA REDONDO BAILÉN",
    "PABLO ROCAMORA LÓPEZ",
    "NIKITA VIDRASCU",
    "LUIS CACHO FABREGAT"
  ];
  
  function alumnoAleatorio(lista){
    let numRandom = Math.random();
    let item = Math.floor(numRandom * lista.length);
    return lista[item];
  }
  
  console.log(alumnoAleatorio(alumnos));




  function definirCadena ( texto ) {
 
    if (texto === texto.toLowerCase()) {
      console.log('La palabra esta compuesta de minusculas');
    }else if (texto === texto.toUpperCase()) {
      console.log('La palabra esta compuesta de mayusculas');
    } else {
      console.log('La palabra es una combinacion de ambas ');
    }
    
  
    console.log('La longitud del texto es ' + texto.length + ' caracteres');
  }
  
  
  
  
  definirCadena('Ha');