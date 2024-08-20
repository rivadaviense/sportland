const PRODUCTOS = [
    // Jordan
    {
        id: 'jordan 1',
        titulo: 'Air Jordan 1',
        imagen: '../img/jordan/nike 2.jpg',
        categorias: {
            nombre: 'zapatillas Jordan',
            id: 'jordan',
        },
        precio: 20000 
    },
    {
        id: 'jordan 2',
        titulo: 'Air Jordan 2',
        imagen: '../img/jordan/nike3.jpg',
        categorias: {
            nombre: 'zapatillas Jordan',
            id: 'jordan',
        },
        precio: 20000 
    },
    {
        id: 'jordan 3',
        titulo: 'Air Jordan 3',
        imagen: '../img/jordan/nike 5.webp',
        categorias: {
            nombre: 'zapatillas Jordan',
            id: 'jordan',
        },
        precio: 20000 
    },

    // Dunk
    {
        id: 'dunk 1',
        titulo: 'Nike Dunk 1',
        imagen: '../img/dunk/dunk1.jpg',
        categorias: {
            nombre: ' zapatillas Dunk',
            id: 'dunk',
        },
        precio: 20000 
    },
    {
        id: 'dunk 2',
        titulo: 'Nike Dunk 2',
        imagen: '../img/dunk/dunk2.webp',
        categorias: {
            nombre: 'zapatillas Dunk',
            id: 'dunk',
        },
        precio: 20000 
    },
    {
        id: 'dunk 3',
        titulo: 'Nike Dunk 3',
        imagen: '../img/dunk/dunk3.jpeg',
        categorias: {
            nombre: 'zapatillas Dunk',
            id: 'dunk',
        },
        precio: 20000 
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector ("#numerito");



function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = ""; 

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
          <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
          <div class="producto-detalles">
              <h3 class="producto-titulo">${producto.titulo}</h3>
              <p class="producto-precio">$${producto.precio}</p>
              <button class="producto-agregar" id="${producto.id}">agregar</button>
          </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar ()
 
;
   
}

cargarProductos(PRODUCTOS);

botonCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonCategoria.forEach(boton => boton.classList.remove("active"));
        
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos"){
          
            const productoCategorias = PRODUCTOS.find (producto => producto.categorias.id === e.currentTarget.id);
                       
            tituloPrincipal.innerText = productoCategorias.categorias.nombre;

        const productosBoton = PRODUCTOS.filter(producto => producto.categorias.id === e.currentTarget.id);
        cargarProductos(productosBoton);
        }else {

            tituloPrincipal.innerText = "Todas las zapatillas";
            cargarProductos(PRODUCTOS);

        } 
    });
});

function actualizarBotonesAgregar (){

    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("producto-en-carrito")



    if (productosEnCarritoLS){
         productosEnCarrito = JSON.parse (productosEnCarritoLS);
         actualizarNumerito ();
    }else {
        productosEnCarrito = [];

    };



function agregarAlCarrito (e){
    const idBoton = e.currentTarget.id;
    const productoAgregado =PRODUCTOS.find (producto => producto.id === idBoton);

    if (productosEnCarrito.some (producto => producto.id === idBoton) ){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad ++;

    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push (productoAgregado);
    }
    actualizarNumerito ()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
   
}


function actualizarNumerito (){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0 );
    numerito.innerText = nuevoNumerito;

}

