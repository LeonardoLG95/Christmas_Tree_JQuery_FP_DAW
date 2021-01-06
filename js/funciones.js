$(document).ready(eventos);

function eventos(){
    //Botones
    $("#poner").on('click',poner);
    $("#mover").on('click',mover);
}

//Id bolas
let id=0;

//Bolas almacenadas
let arrayBolas=[];

function poner(){
    //X
    let minX=40;
    let maxX=320;

    //Y
    let minY=0;
    let maxY=310;

    let puntoMedio=180;
    let cantPixeles=2;
    let posicionY=0;

    //Posición horizontal
    let posicionX=Math.floor(Math.random()*(maxX - minX+1) + minX);

    /*En base a la posición horizontal, calculo la posición vertical (Y)
    teniendo en cuenta las diagonales del triangulo del árbol.

    Aproximadamente por cada pixel horizontal hay que aumentar
    el mínimo vertical en 2px (aumentar es hacia abajo en JS).
    
    Posición horizontal es menor de 180px, izquierda:*/
    if(posicionX<=puntoMedio){
        minY=(puntoMedio-posicionX)*cantPixeles;
        posicionY=Math.floor(Math.random()*(maxY - minY+1) + minY);
    }
    
    //Posición horizontal es mayor de 180px, derecha:
    if(posicionX>puntoMedio){
        minY=(posicionX-puntoMedio)*cantPixeles;
        posicionY=Math.floor(Math.random()*(maxY - minY+1) + minY);
    }

    //Array colores
    let colores=['red','blue','green','aqua','purple','aquamarine','yellow','orange','gold','silver'];
    let colorAleatorio=Math.floor(Math.random()*(10))

    
    /*Bola con la posicion y el color 
    (+10 para que la posicion sea en el centro de la bola, tiene un ancho de 20px)*/
    let bola='<div class="bola" id="'+id+'"style="left:'+(posicionX+10)+'px;top:0px;background-color:'+colores[colorAleatorio]+';"></div>';
    
    //Agrego la bola al div con el tamaño de la imagen
    $('#divImg').append(bola);
    
    //Animación con la bola ya creada
    $('#'+id).animate({top:posicionY+'px',opacity: '1'});

    //Añado a la lista para luego eliminar
    arrayBolas.push(id);

    //Aumento el id para la siguiente
    id++;
    $('#creadas').html('Bolas Creadas: '+id);
}

//Bolas eliminadas
let eliminadas=0;

function mover(){
    //Animación del árbol
    $('#arbol').animate({right:'35px'});
    $('#arbol').animate({right:'-45px'});
    $('#arbol').animate({right:'0px'});
    
    //Colocar animación de desaparición en todas las bolas
    arrayBolas.forEach(element => {
        //Caida de la bola
        $('#'+element).animate({top:'360px',opacity:'0'});

        //Eliminación del DOM
        setTimeout(function() {
            $('#'+element).remove();
        }, 500);
    });

    //Sumar las eliminadas y restablecer id a 0
    eliminadas+=id;
    id=0;

    //Imprimirlo en los labels
    $('#creadas').html('Bolas Creadas: '+id);
    $('#eliminadas').html(' Eliminadas: '+eliminadas);

    //Vaciar array de bolas
    arrayBolas=[];
}

