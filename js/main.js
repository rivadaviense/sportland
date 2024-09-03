
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

let PRODUCTOS = []; 

fetch('./productos.json') 
    .then(response => response.json())
    .then(data => {
        PRODUCTOS = data.productos; 
        cargarProductos(PRODUCTOS); 
        actualizarNumerito(); 
    })
    .catch(error => console.error('Error al cargar los productos:', error));






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
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

cargarProductos(PRODUCTOS);

botonCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos") {
            const productosBoton = PRODUCTOS.filter(producto => producto.categorias.id === e.currentTarget.id);
            tituloPrincipal.innerText = productosBoton.length > 0 ? productosBoton[0].categorias.nombre : "No hay productos";
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todas las zapatillas";
            cargarProductos(PRODUCTOS);
        } 
    });
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = PRODUCTOS.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    const nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

actualizarNumerito();


  async function Alertamail() {
    const { value: email } = await Swal.fire({
      title: "Tenemos muchas ofertas, dejanos tu correo",
      input: "email",
      inputLabel: "",
      inputPlaceholder: "jps@sportland"
    });
  
    if (email) {
      Swal.fire(`Entered email: ${email}`);
    }
  }
  
  // Espera 8 segundos antes de ejecutar la función
  setTimeout(Alertamail, 5000);