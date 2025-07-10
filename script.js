const temas = [
  {
    colorFondo: "#E0F7FB",
    colorFondoNota: "#F25423",
    colorNota: "#4E342E",
    colorBarra: "#21B1E6",
  },
  {
    colorFondo: "#FCFCFD",
    colorFondoNota: "#1B4278",
    colorNota: "#FCFCFD",
    colorBarra: "#FFCC03",
  },
  {
    colorFondo: "#E0F2E9",
    colorFondoNota: "#FFCC03",
    colorNota: "#5D4037",
    colorBarra: "#399746",
  },
  {
    colorFondo: "#EAE6F8",
    colorFondoNota: "#1B4278",
    colorNota: "#FCFCFD",
    colorBarra: "#514EA0",
  },
  {
    colorFondo: "#FCE4EC",
    colorFondoNota: "#399746",
    colorNota: "#FCFCFD",
    colorBarra: "#D24C9B",
  },
  {
    colorFondo: "#FFF9E3",
    colorFondoNota: "#F25423",
    colorNota: "#4E342E",
    colorBarra: "#FFCC03",
  },
  {
    colorFondo: "#FFECE4",
    colorFondoNota: "#514EA0",
    colorNota: "#FCFCFD",
    colorBarra: "#F25423",
  },
  {
    colorFondo: "#DCE9F5",
    colorFondoNota: "#D24C9B",
    colorNota: "#FCFCFD",
    colorBarra: "#1B4278",
  },
];

function aplicarTema(índice) {
  const tema = temas[índice % temas.length];

  document.body.style.backgroundColor = tema.colorFondo;
  document.getElementsByClassName("barra-superior")[0].style.color =
    tema.colorBarra;
  const notaElem = document.getElementById("nota");
  notaElem.style.backgroundColor = tema.colorFondoNota;
  notaElem.style.color = tema.colorNota;
}

function aplicarRotación() {
  const nota = document.getElementById("nota");
  // Ángulo de rotación aleatorio entre -2 y +2 grados
  const ángulo = (Math.random() * 4 - 2).toFixed(2);
  nota.style.transform = `rotate(${ángulo}deg)`;
}

function obtenerDíaDelAño() {
  const ahora = new Date();
  const comienzo = new Date(ahora.getFullYear(), 0, 0);
  const dif =
    ahora -
    comienzo +
    (comienzo.getTimezoneOffset() - ahora.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(dif / (1000 * 60 * 60 * 24));
}

function mostrarMensaje(mensajes) {
  const día = obtenerDíaDelAño();
  const índice = (día - 1) % mensajes.length;
  aplicarTema(índice);
  aplicarRotación();
  document.getElementById("nota").textContent = mensajes[índice];
}

function mostrarDíasJuntos(fechaInicial) {
  const fechaDeInicio = new Date(fechaInicial);
  const hoy = new Date();
  const tiempoDeDif = hoy - fechaDeInicio;
  const díasDeDif = Math.floor(tiempoDeDif / (1000 * 60 * 60 * 24));
  document.getElementById("días-juntos").textContent = `Día ${
    díasDeDif + 1
  } siendo novios.`;
}

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    mostrarMensaje(data.mensajes);
    mostrarDíasJuntos(data.fechaDeInicio);
  })
  .catch((error) => {
    console.error("Error al cargar data.json:", error);
    document.getElementById("nota").textContent =
      "No se pudo cargar el mensaje de hoy :(";
  });
