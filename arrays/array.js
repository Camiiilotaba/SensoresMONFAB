function tablaPar(numeroDelQueQuieroSacarLaTabla){
  let impares = [];
  
  for(let i = 1; i <= 10; i++){
    let resultado = i * numeroDelQueQuieroSacarLaTabla;
    if (resultado % 2 === 0){
      console.log(resultado);
    }else{
      impares.push();
    }
    
  }
  console.log(impares);
}

tablaPar(1);