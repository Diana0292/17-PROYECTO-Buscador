//variables
const marca = document.querySelector(`#marca`);
const year = document.querySelector(`#year`);
const minimo = document.querySelector(`#minimo`);
const maximo = document.querySelector(`#maximo`);
const puertas = document.querySelector(`#puertas`);
const transmision = document.querySelector(`#transmision`);
const color = document.querySelector(`#color`);

//contenedor para os resultados
const resultado = document.querySelector(`#resultado`);


const max = new Date().getFullYear();
const min = max - 10;

//generar un objeto con la busqueda
const datosBusqueda = {
    marca: ``,
    year: ``,
    minimo: ``,
    maximo: ``,
    puertas: ``,
    transmision: ``,
    color: ``,
}

//eventos
document.addEventListener(`DOMContentLoaded`, () => {
    mostarAutos(autos);//muestra los autos al cargar

    //llena las opciones de años
    llenarSelector();
})

//event listener para los selectores de busqueda
marca.addEventListener(`change`, e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});
year.addEventListener(`change`, e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});
minimo.addEventListener(`change`, e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});
maximo.addEventListener(`change`, e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});
puertas.addEventListener(`change`, e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});
transmision.addEventListener(`change`, e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});
color.addEventListener(`change`, e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});


//funciones
function mostarAutos(autos) {

    limpiarHTML();//eliminando HTML previo

    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement(`P`);
        autoHTML.textContent =
            ` ${marca}- ${modelo}- ${year}- ${puertas} puertas- transmision:${transmision}- precio:${precio}-
             color:${color}
            `;


        //insertar en HTML
        resultado.appendChild(autoHTML);
    })
}
//limpiar HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

//genera los años del select
function llenarSelector() {
    for (let i = max; i >= min; i--) {
        const option = document.createElement(`option`);
        option.value = i;
        option.textContent = i;
        year.appendChild(option);//agrega las opciones de años a select
    }
}
//function filtrar busqueda
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).
        filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if(resultado.length){
    mostarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();
    const noResultado=document.createElement(`div`);
    noResultado.classList.add(`alerta`, `error`);
    noResultado.textContent= `no hay resultados, intenta con otros terminos de busqueda`;
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}
function filtrarYear(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
};

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
};

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
};

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
};

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
};

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
};
