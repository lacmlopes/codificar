/*


Trabalho individual para segundo módulo - Programadores Cariocas
Projeto: Codificar e decodificar string pelas cifras de César (cifra de substituicão simples) e em 
Base64 (de manipulação em binários e decimais) - Versão 1.0

Autor: Lucas Andrade Da Costa Mateus Lopes

Data: 21/10/2022
Estratégia: manipulação de arrays e seus elementos, através da decomposição de strings 
em arrays correspondentes e processamento em funções. API completa que captura a string digitada por
usuário e reconhece a cifra escolhida.


*/

let alfabeto = new Array 
    (
    'A','B','C','D','E','F','G','H','I','J','K',
    'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j','k','l','m','n','o','p',
    'q','r','s','t','u','v','w','x','y','z');

let asciiArr = new Array ();
let asciiStr = '';
let i;
let j;
let palavraCodificada = '';
let palavraDecodificada = '';
let output = document.getElementById("divOut");
let input = document.querySelector("#inserir");
let codificar = document.getElementById("codificar");
let decodificar = document.getElementById("decodificar");
let corpo = document.getElementById("corpo");

let escolha = document.getElementsByName("cifra");
for (var nRadios = 0; nRadios < escolha.length; nRadios++) {
    escolha[nRadios].checked = false;
}

codificar.addEventListener("click", function(){
    
    if (output.style.visibility == "hidden") {
        output.style.visibility = "visible";
        palavraCodificada = '';     

    verificarRadio(0);
       
    } else {
        output.style.visibility = "hidden";
    }
});


decodificar.addEventListener("click", function(){
 if (output.style.visibility == "hidden") {
      output.style.visibility = "visible";
       palavraDecodificada = '';
    verificarRadio(1);
    } else {
        output.style.visibility = "hidden";
    }

});


function codif(t, cifra) {
   
    for (i=0; i<(input.value.length); i++) {
        var letra = input.value[i];
        var letradec = palavraCodificada[i];
        if (cifra == "cesar") {   
            for (j=0; j<alfabeto.length; j++) {
                if (t == 0) {
                    codificar.disabled = true;
                    decodificar.disabled = false;
                    if (letra == alfabeto[j]) {
                        palavraCodificada = palavraCodificada.concat(alfabeto[j+2]); 

                        break
                    } else if (letra == alfabeto[alfabeto.length - 1]) {
                        palavraCodificada = palavraCodificada.concat(alfabeto[1]); 
                        break
                    } else if (letra == alfabeto[alfabeto.length - 2]) {
                        palavraCodificada = palavraCodificada.concat(alfabeto[0]); 
                        break
                    } else if (letra == " ") {
                        palavraCodificada = palavraCodificada.concat(" "); 
                        break
                    } /*else if (letra =! alfabeto[j]) {
                        let m = 0;
                        
                        if (m == alfabeto.length) {
                            palavraCodificada = palavraCodificada.concat(letra);
                            break
                        }
                        m++;
                    }*/

                    
                } else if (t == 1) {
                    codificar.disabled = false;
                    decodificar.disabled = true;
                    if (letradec == alfabeto[j]) {
                            palavraDecodificada = palavraDecodificada.concat(alfabeto[j-2]); 
                            break
                        } else if (letradec == alfabeto[0]) {
                            palavraDecodificada = palavraDecodificada.concat(alfabeto[alfabeto.length - 2]); 
                            break
                        } else if (letradec == alfabeto[1]) {
                            palavraDecodificada = palavraDecodificada.concat(alfabeto[alfabeto.length - 1]); 
                            break
                        } else if (letra == " ") {
                            palavraDecodificada = palavraDecodificada.concat(" "); 
                            break
                        } /*else if (letra =! alfabeto[j]) {
                            let m = 0;
                            m++;
                            if (m == alfabeto.length) {
                                pala
                            }
                            continue
                        }*/
            
                }     
            } 
        } else if (cifra == "base64") {
            asciiStr += 0 + input.value.charCodeAt(i).toString(2);
            
           if (i==(input.value.length-1)) {
            if (t==1){
                codbase64(1);
            } else if (t==0) {
                codbase64(0);
            }
        }


        }
        //console.log(i + ' ' + palavraCodificada);
         if (t == 0) {
        mudarOutput(palavraCodificada);
        } else if (t == 1) {
        mudarOutput(palavraDecodificada);
        }
    }
}


function mudarOutput(msg) {
    output.innerHTML = '<h2 id="output">' + msg + '</h2>';

}

function verificarRadio(x) { //verifica qual botão foi escolhido 
     
    if (escolha[0].checked) {
    codif(x, "base64");
    } else if (escolha[1].checked) {
    codif(x, "cesar");
    } else {
     alert("Você está tentando codificar/decodificar uma string sem explicitar por qual cifra.");    
    }
       
}


function codbase64(t) {
    if (t==0) {

        asciiArr = Array();
         codificar.disabled = true;
         decodificar.disabled = false;
        for (var k = 0; k <= (asciiStr.length / 8); k++) {
            asciiArr.push(asciiStr.substring(6*k, 6*(k+1)));
            
            
        }
        
        if (asciiArr[asciiArr.length - 1].length != 6) {
            let m;
            let lim = 6 - asciiArr[asciiArr.length - 1].length;
           
            let ult = asciiArr[asciiArr.length - 1];
            
            for (m=0;m<lim;m++) {
                ult = ult.concat("0");
            }
            asciiArr[asciiArr.length - 1] = ult;
        } 

        for (m=0;m<asciiArr.length;m++) {
            asciiArr[m] =  "00" + asciiArr[m];
        }
     
       

        for(m=0; m<asciiArr.length;m++) {
            var letra = parseInt(asciiArr[m], 2);

            palavraCodificada += alfabeto[letra];
        }
        console.log(asciiArr);
        mudarOutput(palavraCodificada);
    } else if (t==1) {
        codificar.disabled = false;
         decodificar.disabled = true;
        let palavra;
        lim = '';
        asciiStr = '';
        asciiArr = Array();
        if (palavraCodificada ==! "") {
            palavra = input.value;
            

        } else {
           palavra = palavraCodificada;
           
        }   
        console.log(palavra);
        for (m=0;m<palavra.length;m++) /* itera sobre a palavra selecionada */ {
            letra = palavra[m]; //LETRA DA PALAVRA QUE ESTÁ NO INDICE m
            for (i=0;i<alfabeto.length;i++) { 
                let lim = 0;
                if (letra == alfabeto[i]) { //VERIRFICA SE A LETRA É IGUAL A UMA LETRA DO ALFABETO
                    console.log(letra);
                    letraD = alfabeto.indexOf(alfabeto[i]); //captura o valor decimal da letra ao encontrar o indice correspondente
                    letraB = letraD.toString(2); //transforma em binario
                    //for(k=0;k<asciiArr.length;k++) {
                        

                        if (letraB.length < 6){
                            lim = 6 - letraB.length;
                            let zero = '0';
                            console.log(lim);
                            zero = zero.repeat(lim);
                            console.log(zero);
                            letraB = zero + letraB;


                        }
                    asciiStr += letraB;
                    asciiArr.push(letraB); 
                }
            }
            
            
        }

        let palavra8;
        console.log(asciiArr);

        let tamanho = asciiArr.length;
        
        for (k=0;k<asciiArr.length;k++) {
            palavra8 = asciiStr.substring(8*k, 8*(k+1));
            if (palavra8.length == 8) {
                console.log(palavra8);
                asciiArr[k] = String.fromCharCode(parseInt(palavra8, 2));
                palavraDecodificada += asciiArr[k];
            } else if (palavra8.length < 8) {
                asciiArr[k] = '';
            } 
                
        }
        console.log(asciiArr);
        console.log(asciiStr);

        mudarOutput(palavraDecodificada);

        /*let el;charCodeAt(indexOf(alfabeto[letra])).toString(2)
        asciiStr = ''
        codificar.disabled = false;
        decodificar.disabled = true;
        for(m=0;m<asciiArr.length;m++) {
            el = asciiArr[m];
            
            el = el.substring(2,el.length);
            asciiArr[m] = el;
          //  console.log(Math.floor(42/8));
            letra = String.fromCharCode(asciiArr[m]);
            palavraDecodificada += letra;
        }

        mudarOutput(palavraDecodificada);
        console.log(asciiArr);
        console.log(asciiStr);*/
            }
            }


    


