// eliminar.js

const formBuscar = document.querySelector("#form-buscar");
const btnEliminar = document.querySelector("#btn-eliminar");
const tbodySelector = "table tbody";

let idActual = null;

formBuscar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.querySelector("#id-buscar").value.trim();

  try {
    const auto = await obtenerAutoPorId(id);
    pintarTabla(tbodySelector, auto);
    idActual = auto.id;
    btnEliminar.disabled = false;
    mostrarMensaje("#mensaje", `Auto ${id} encontrado. Puedes eliminarlo.`, "exito");
  } catch (err) {
    idActual = null;
    btnEliminar.disabled = true;
    mostrarMensaje("#mensaje", err.message, "error");
  }
});

btnEliminar.addEventListener("click", async () => {
  if (!idActual) return;

  const confirmar = confirm(`¿Seguro que quieres eliminar el auto ${idActual}?`);
  if (!confirmar) return;

  try {
    await eliminarAuto(idActual);
    mostrarMensaje("#mensaje", `Auto ${idActual} eliminado correctamente.`, "exito");
    pintarTabla(tbodySelector, []);
    btnEliminar.disabled = true;
    idActual = null;
  } catch (err) {
    mostrarMensaje("#mensaje", err.message, "error");
  }
});
