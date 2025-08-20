const descuentoEfectivo = 0.10;
const interesTarjeta = 0.15;

// Traer productos del localStorage o inicializar vacio
let productos = JSON.parse(localStorage.getItem("carrito")) || [];

// Referencias a elementos del DOM
const form = document.getElementById("form-producto");
const lista = document.getElementById("lista-productos");
const resultado = document.getElementById("resultado");
const btnVaciar = document.getElementById("btn-vaciar");
const btnEfectivo = document.getElementById("btn-efectivo");
const btnTarjeta = document.getElementById("btn-tarjeta");

// Eventos
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);

  if (!nombre || isNaN(precio)) return;

  productos.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(productos));
  form.reset();
  mostrarProductos();
});

btnEfectivo.addEventListener("click", () => calcularTotal("efectivo"));
btnTarjeta.addEventListener("click", () => calcularTotal("tarjeta"));
btnVaciar.addEventListener("click", vaciarCarrito);

// Funciones
function mostrarProductos() {
  lista.innerHTML = "";
  productos.forEach((prod) => {
    const li = document.createElement("li");
    li.textContent = `${prod.nombre} - $${prod.precio.toFixed(2)}`;
    lista.appendChild(li);
  });
}

function calcularTotal(tipoPago) {
  if (productos.length === 0) {
    resultado.textContent = "No hay productos cargados.";
    resultado.style.color = "black";
    return;
  }

  let total = productos.reduce((acc, p) => acc + p.precio, 0);

  if (tipoPago === "efectivo") {
    total -= total * descuentoEfectivo;
    resultado.textContent = `Total con 10% de descuento: $${total.toFixed(2)}`;
    resultado.style.color = "green";
  } else {
    total += total * interesTarjeta;
    resultado.textContent = `Total con 15% de interés: $${total.toFixed(2)}`;
    resultado.style.color = "red";
  }
}

function vaciarCarrito() {
  productos = [];
  localStorage.removeItem("carrito");
  mostrarProductos();
  resultado.textContent = "";
}
