
const descuentoEfectivo = 0.10;
const interesTarjeta = 0.15;

let productos = [];

function agregarProducto() {
  let nombre = prompt("Ingrese el nombre del producto:");
  let precio = parseFloat(prompt("Ingrese el precio del producto:"));
  
  if (!isNaN(precio)) {
    productos.push({ nombre, precio });
    alert(`Producto "${nombre}" agregado con precio $${precio}`);
  } else {
    alert("Precio inválido. Intente nuevamente.");
  }
}


function calcularTotal() {
  if (productos.length === 0) {
    alert("No hay productos cargados.");
    return;
  }

  let total = productos.reduce((acc, prod) => acc + prod.precio, 0);
  console.log("Subtotal: $" + total.toFixed(2));

  let pagoConEfectivo = confirm("¿Desea pagar en efectivo? (Aceptar = sí / Cancelar = tarjeta)");

  if (pagoConEfectivo) {
    let descuento = total * descuentoEfectivo;
    total -= descuento;
    alert(`Se aplicó un 10% de descuento.\nTotal a pagar: $${total.toFixed(2)}`);
  } else {
    let interes = total * interesTarjeta;
    total += interes;
    alert(`Se aplicó un 15% de interés.\nTotal a pagar: $${total.toFixed(2)}`);
  }

  console.log("Total final: $" + total.toFixed(2));
}

function iniciarSimulador() {
  alert("¡Bienvenido al simulador de precios!");

  let seguir = true;

  while (seguir) {
    agregarProducto();
    seguir = confirm("¿Desea agregar otro producto?");
  }

  calcularTotal();
}

iniciarSimulador();
