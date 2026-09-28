// alta.js

const formAlta = document.querySelector("#form-alta");

formAlta.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.querySelector("#id").value.trim();
  const marca = document.querySelector("#marca").value.trim();
  const precio = document.querySelector("#precio").value;
  const color = document.querySelector("#color").value;

  const nuevoAuto = { marca, precio: Number(precio), color };
  if (id) nuevoAuto.id = Number(id); // el id es opcional

  try {
    const creado = await agregarAuto(nuevoAuto);
    mostrarMensaje("#mensaje", `Auto agregado correctamente (id: ${creado?.id ?? "?"})`, "exito");
    formAlta.reset();
  } catch (err) {
    mostrarMensaje("#mensaje", err.message, "error");
  }
});
