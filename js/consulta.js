// consulta.js

const formConsulta = document.querySelector("#form-consulta");
const tbodySelector = "table tbody";

// Al cargar la página, mostramos todos los autos
document.addEventListener("DOMContentLoaded", async () => {
  await cargarTodos();
});

async function cargarTodos() {
  try {
    const autos = await obtenerAutos();
    pintarTabla(tbodySelector, autos);
  } catch (err) {
    mostrarMensaje("#mensaje", err.message, "error");
  }
}

formConsulta.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.querySelector("#id").value.trim();

  try {
    if (!id) {
      await cargarTodos();
      return;
    }
    const auto = await obtenerAutoPorId(id);
    pintarTabla(tbodySelector, auto);
  } catch (err) {
    mostrarMensaje("#mensaje", err.message, "error");
  }
});
