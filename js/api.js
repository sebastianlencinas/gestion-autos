// api.js
// Capa de acceso a la API REST de autos, implementada con XMLHttpRequest.
// Expone las mismas funciones que antes (obtenerAutos, agregarAuto, etc.)
// devolviendo Promises, para que consulta.js/alta.js/modificar.js/eliminar.js
// puedan seguir usando await sin cambios.

const API_URL = "https://api-autos-tgwd.onrender.com/autos";

// Si el PUT/POST siguen bloqueados por CORS (porque el preflight OPTIONS
// no responde bien), descomentá esta línea para volver a usar el proxy local:
// const API_URL = "http://localhost:3000/autos";

/**
 * Wrapper genérico sobre XMLHttpRequest que devuelve una Promise.
 * @param {string} method  GET | POST | PUT | DELETE
 * @param {string} path    parte final de la URL (ej: "5"), vacío para la raíz
 * @param {object} [body]  objeto a enviar como JSON (opcional)
 */
function request(method, path = "", body = null) {
  const url = path ? `${API_URL}/${path}` : API_URL;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    // Content-Type solo se manda cuando hay body (POST/PUT).
    // En GET/DELETE evitamos la cabecera para que el navegador la trate
    // como petición "simple" y no dispare un preflight OPTIONS,
    // que esta API en particular puede no responder con CORS.
    if (body !== null) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = () => {
      const status = xhr.status;
      let data = null;

      try {
        data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
      } catch {
        data = xhr.responseText;
      }

      if (status >= 200 && status < 300) {
        resolve(data);
      } else {
        const detalle = (data && (data.mensaje || data.message)) || xhr.statusText;
        reject(new Error(`Error ${status}: ${detalle}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Error de red: no se pudo conectar con la API"));
    };

    if (body !== null) {
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  });
}

// GET /autos
function obtenerAutos() {
  return request("GET", "");
}

// GET /autos/:id
function obtenerAutoPorId(id) {
  return request("GET", `${id}`);
}

// POST /autos
function agregarAuto(auto) {
  return request("POST", "", auto);
}

// PUT /autos/:id
function modificarAuto(id, auto) {
  return request("PUT", `${id}`, auto);
}

// DELETE /autos/:id
function eliminarAuto(id) {
  return request("DELETE", `${id}`);
}
