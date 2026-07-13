const btnEl = document.getElementById("btn");
const bmiResultEl = document.getElementById("bmi-result");
const weightConditionEl = document.getElementById("weight-condition");
const adviceTextEl = document.getElementById("advice-text");
const bmiPointerEl = document.getElementById("bmi-pointer");
const genderEl = document.getElementById("gender");
const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");

// Función para actualizar el puntero visual
function updateGauge(bmi) {
  // Escala de IMC: 10 (izquierda) a 40 (derecha) para coincidir con la nueva barra CSS
  const percentage = Math.min(Math.max(((bmi - 10) / (40 - 10)) * 100, 0), 100);

  // Movemos el puntero con la propiedad 'left'
  bmiPointerEl.style.left = `${percentage}%`;
}

function calculateBMI() {
  // valueAsNumber extrae el valor directamente como número en vez de string
  const heightValue = heightEl.valueAsNumber / 100;
  const weightValue = weightEl.valueAsNumber;

  // Validación robusta: Evita valores vacíos, negativos o irrealistas (ej: altura < 50cm o peso < 2kg)
  if (!heightValue || !weightValue || heightValue < 0.5 || weightValue < 2) {
    bmiResultEl.innerText = "--.-";
    weightConditionEl.innerText = "Valores inválidos.";
    weightConditionEl.style.color = "#e74c3c";
    adviceTextEl.innerText = "Por favor, introduce datos coherentes.";
    updateGauge(25); // Posición neutral si falla
    return;
  }

  // Cálculo del IMC usando el operador de exponente (**)
  const bmiValue = weightValue / heightValue ** 2;

  bmiResultEl.innerText = bmiValue.toFixed(1);
  updateGauge(bmiValue); // Actualizamos el indicador visual

  let condition = "";
  let advice = "";
  let color = "";

  // Clasificación y consejos personalizados
  if (bmiValue < 18.5) {
    condition = "Bajo Peso";
    color = "#3498db";
    advice =
      "Podría ser útil consultar a un nutricionista para equilibrar tu dieta y asegurarte de obtener los nutrientes necesarios.";
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    condition = "Peso Normal";
    color = "#2ecc71";
    advice =
      "¡Excelente! Mantener un estilo de vida saludable y ejercicio regular es la mejor manera de conservar tu bienestar.";
  } else if (bmiValue >= 25 && bmiValue <= 29.9) {
    condition = "Sobrepeso";
    color = "#f39c12";
    advice =
      "Incorporar actividad física moderada y cuidar tu dieta puede ayudarte a alcanzar un rango de peso más saludable.";
  } else {
    condition = "Obesidad";
    color = "#e74c3c";
    advice =
      "Para tu salud a largo plazo, considera hablar con un médico sobre estrategias seguras para el control del peso.";
  }

  // Renderizado de resultados en el DOM
  weightConditionEl.innerText = condition;
  weightConditionEl.style.color = color;
  adviceTextEl.innerText = advice;
}

btnEl.addEventListener("click", calculateBMI);

// Inicializamos la barra en una posición neutral al cargar (IMC 25)
updateGauge(25);
