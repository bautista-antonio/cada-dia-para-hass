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

function aplicarTema(indice) {
  const tema = temas[indice % temas.length];

  document.body.style.backgroundColor = tema.colorFondo;

  const barra = document.getElementsByClassName("barra-superior")[0];
  if (barra) {
    barra.style.color = tema.colorBarra;
  }

  const notaElem = document.getElementById("nota");
  if (notaElem) {
    notaElem.style.backgroundColor = tema.colorFondoNota;
    notaElem.style.color = tema.colorNota;
  }
}

function aplicarRotacion() {
  const nota = document.getElementById("nota");
  if (!nota) return;
  // Ángulo aleatorio entre -2 y +2
  const angulo = Math.random() * 4 - 2; // número, no string
  nota.style.transform = `rotate(${angulo.toFixed(2)}deg)`;
}

// Día del año robusto en UTC (evita problemas de DST)
function obtenerDiaDelAnoUTC() {
  const ahora = new Date();
  const inicioUTC = Date.UTC(ahora.getUTCFullYear(), 0, 1);
  const hoyUTC = Date.UTC(
    ahora.getUTCFullYear(),
    ahora.getUTCMonth(),
    ahora.getUTCDate()
  );
  const dif = hoyUTC - inicioUTC;
  return Math.floor(dif / (1000 * 60 * 60 * 24)) + 1; // +1 para que 1 Ene sea 1
}

function mostrarMensaje(mensajes) {
  if (!Array.isArray(mensajes) || mensajes.length === 0) {
    const nota = document.getElementById("nota");
    if (nota) nota.textContent = "No hay mensajes para mostrar hoy.";
    return;
  }
  const dia = obtenerDiaDelAnoUTC();
  const indice = (dia - 1) % mensajes.length;
  aplicarTema(indice);
  aplicarRotacion();
  const nota = document.getElementById("nota");
  if (nota) nota.textContent = mensajes[indice];
}

// Parse seguro de "YYYY-MM-DD" a fecha local sin UTC shift
function parseFechaLocal(yyyyMmDd) {
  const [y, m, d] = (yyyyMmDd || "").split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d); // medianoche local
}

function mostrarDiasJuntos(fechaInicial) {
  const fechaDeInicio =
    typeof fechaInicial === "string"
      ? parseFechaLocal(fechaInicial)
      : new Date(fechaInicial);
  if (!(fechaDeInicio instanceof Date) || isNaN(fechaDeInicio)) return;

  const hoy = new Date();
  // Normalizar a medianoche local
  fechaDeInicio.setHours(0, 0, 0, 0);
  hoy.setHours(0, 0, 0, 0);

  const tiempoDeDif = hoy - fechaDeInicio;
  const diasDeDif = Math.floor(tiempoDeDif / (1000 * 60 * 60 * 24));

  const contador = document.getElementById("días-juntos");
  if (contador) {
    contador.textContent = `Día ${diasDeDif + 1} siendo novios.`;
  }
}

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    mostrarMensaje(data?.mensajes);
    mostrarDiasJuntos(data?.fechaDeInicio);
  })
  .catch((error) => {
    console.error("Error al cargar data.json:", error);
    const nota = document.getElementById("nota");
    if (nota) nota.textContent = "No se pudo cargar el mensaje de hoy :(";
  });
