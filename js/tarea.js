const descuentoEfectivo = 0.10;
const interesTarjeta = 0.15;

let productos = JSON.parse(localStorage.getItem("carrito")) || [];

const form = document.getElementById("form-producto");
const lista = document.getElementById("lista-productos");
const resultado = document.getElementById("resultado");

document.getElementById("btn-efectivo").addEventListener("click", () => calcularTotal("efectivo"));
document.getElementById("btn-tarjeta").addEventListener("click", () => calcularTotal("tarjeta"));

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

function mostrarProductos() {
  lista.innerHTML = "";
  productos.forEach((prod, index) => {
    const li = document.createElement("li");
    li.textContent = `${prod.nombre} - $${prod.precio.toFixed(2)}`;
    lista.appendChild(li);
  });
}

function calcularTotal(tipoPago) {
  if (productos.length === 0) {
    resultado.textContent = "No hay productos cargados.";
    return;
  }

  let total = productos.reduce((acc, p) => acc + p.precio, 0);

  if (tipoPago === "efectivo") {
    total -= total * descuentoEfectivo;
    resultado.textContent = `Total con 10% de descuento: $${total.toFixed(2)}`;
  } else {
    total += total * interesTarjeta;
    resultado.textContent = `Total con 15% de interés: $${total.toFixed(2)}`;
  }
}

// Mostrar productos al cargar
mostrarProductos();
