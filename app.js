//querySelector permite traer un elemento de html
//Luego con innerhtml permite ponerle un valor a ese elemento
//DOM = Document Object Model
//Javascript no requiere usar ; pero es una buena practica

/*ESTE CODIGOE ESTA OBSOLETO

let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego del numero secreto';

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un numero del 1 al 10';

*/

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//ESTE CODIGO ESTA MEJOR
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

//Se puede colocar codigo directamente en html pero es mejor crear una funcion y poner el codigo aqui
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario === numeroSecreto) {
        //Ojo todos deben tener el mismo tipo de comillas o da error
        //Usar las comillas invertidas se le llama Template Strings
        //Y las comillas invertidas se llaman backticks ``
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        }
        else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
}

function generarNumeroSecreto() {
    //Devuelve un numero aleatorio entre 1 y 10, el 0 no esta incluido
    //Ver mas en la documentacion de mozilla
    //Math.floor redondea a entero hacia abajo

    //Si ya se sortearon todos los numeros posibles
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles')
    } else {
        let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        }
        else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
        return;
    }
}

function limpiarCaja() {
    valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = '';
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    console.log(listaNumerosSorteados);
    intentos = 1;
}

function reiniciarJuego() {
    //Limpiar Caja
    limpiarCaja();
    //Indicar mensaje de intervalo de numeros
    //Generar el numero aleatorio
    //Inicializar el numero intentos
    condicionesIniciales();
    //Deshabilitar el boton de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

condicionesIniciales();
