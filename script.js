class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidad) {
        const index = this.productos.findIndex(item => item.id === producto.id);
        if (index !== -1) {
            this.productos[index].cantidad += cantidad;
        } else {
            this.productos.push({ ...producto, cantidad });
        }
    }

    eliminarProducto(idProducto) {
        this.productos = this.productos.filter(producto => producto.id !== idProducto);
    }

    actualizarCantidad(idProducto, nuevaCantidad) {
        const index = this.productos.findIndex(producto => producto.id === idProducto);
        if (index !== -1) {
            this.productos[index].cantidad = nuevaCantidad;
        }
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => {
            return total + producto.precio * producto.cantidad;
        }, 0);
    }

    obtenerProductos() {
        return this.productos;
    }
}

const carrito = new Carrito();

document.addEventListener ('DOMContentLoaded', () => {
    const apiURL = 'http://jsonblob.com/1298709773401579520';
    const carrito = new Carrito();

    fetch (apiURL)
    .then (reponse => reponse.json ())
    .then (data => {
        mostrarProductos (data.productos);
    })
})

let productosDisponibles = [
    { id: 1, nombre: "iFhone 13 pro", REF: "0k3QOSOV4V", precio: 938.99,},
    { id: 2, nombre: "Cargador", REF: "TGD5XORY1L", precio: 49.99},
    { id: 3, nombre: "Funda de piel", REF: "IOKW9BQ9F3", precio: 79.99}
];

function mostrarProductos() {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = "";

    productosDisponibles.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        productoDiv.innerHTML = `
            <span>${producto.nombre} - ${producto.precio}€</span>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

function agregarAlCarrito(idProducto) {
    const producto = productosDisponibles.find(p => p.id === idProducto);
    carrito.agregarProducto(producto, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = "";

    carrito.obtenerProductos().forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        productoDiv.innerHTML = `
            <span>${producto.nombre} - ${producto.precio}€ x ${producto.cantidad}</span>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            <input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${producto.id}, this.value)">
        `;
        carritoDiv.appendChild(productoDiv);
    });

    document.getElementById("total").textContent = carrito.calcularTotal();
}

function eliminarProducto(idProducto) {
    carrito.eliminarProducto(idProducto);
    actualizarCarrito();
}

function actualizarCantidad(idProducto, nuevaCantidad) {
    carrito.actualizarCantidad(idProducto, parseInt(nuevaCantidad));
    actualizarCarrito();
}

mostrarProductos();
