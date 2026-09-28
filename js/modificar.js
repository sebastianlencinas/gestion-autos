// modificar.js

const formBuscar = document.querySelector("#form-buscar");
const formModificar = document.querySelector("#form-modificar");
const tbodySelector = "table tbody";

let idActual = null;

formBuscar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.querySelector("#id-buscar").value.trim();

  try {
    const auto = await obtenerAutoPorId(id);
    pintarTabla(tbodySelector, auto);

    // Precargamos el formulario de modificación con los datos actuales
    idActual = auto.id;
    document.querySelector("#marca").value = auto.marca ?? "";
    document.querySelector("#precio").value = auto.precio ?? "";
    document.querySelector("#color").value = auto.color ?? "#000000";

    formModificar.querySelectorAll("input, button").forEach((el) => (el.disabled = false));
    mostrarMensaje("#mensaje", `Auto ${id} cargado. Edita los campos y confirma.`, "exito");
  } catch (err) {
    idActual = null;
    mostrarMensaje("#mensaje", err.message, "error");
  }
});

formModificar.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!idActual) {
    mostrarMensaje("#mensaje", "Primero busca un auto por ID.", "error");
    return;
  }

  const marca = document.querySelector("#marca").value.trim();
  const precio = document.querySelector("#precio").value;
  const color = document.querySelector("#color").value;

  try {
    const actualizado = await modificarAuto(idActual, {
      marca,
      precio: Number(precio),
      color,
    });
    pintarTabla(tbodySelector, actualizado ?? { id: idActual, marca, precio, color });
    mostrarMensaje("#mensaje", `Auto ${idActual} modificado correctamente.`, "exito");
  } catch (err) {
    mostrarMensaje("#mensaje", err.message, "error");
  }
});
