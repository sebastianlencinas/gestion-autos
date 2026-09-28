// ui.js
// Funciones de ayuda para pintar tablas y mensajes de estado.
// Se comparte entre consulta.js, modificar.js y eliminar.js

function pintarTabla(tbodySelector, autos) {
  const tbody = document.querySelector(tbodySelector);
  tbody.innerHTML = "";

  const lista = Array.isArray(autos) ? autos : [autos];

  if (lista.length === 0 || !lista[0]) {
    tbody.innerHTML = `<tr><td colspan="4">Sin resultados</td></tr>`;
    return;
  }

  lista.forEach((auto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${auto.id ?? ""}</td>
      <td>${auto.marca ?? ""}</td>
      <td>${auto.precio ?? ""}</td>
      <td style="background-color:${auto.color ?? ""}">${auto.color ?? ""}</td>
    `;
    tbody.appendChild(fila);
  });
}

function mostrarMensaje(selector, texto, tipo = "exito") {
  const el = document.querySelector(selector);
  if (!el) return;
  el.textContent = texto;
  el.className = `mensaje ${tipo}`;
}
