/* =========================
   ELEMENT REFERENCES
========================= */
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
const backspaceBtn = document.querySelector(".backspace");
const historyBtn = document.querySelector(".history");

/* =========================
   STATE
========================= */
let currentInput = "";
let history = [];
let historyIndex = -1;
let historyOpen = false;

/* =========================
   HISTORY UI (DYNAMIC)
========================= */
const historyOverlay = document.createElement("div");
historyOverlay.className = "history-overlay";
historyOverlay.style.cssText = `
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const historyBox = document.createElement("div");
historyBox.style.cssText = `
  background: #111;
  color: #fff;
  width: min(90%, 420px);
  max-height: 70vh;
  border-radius: 16px;
  padding: 16px;
  overflow-y: auto;
`;

historyOverlay.appendChild(historyBox);
document.body.appendChild(historyOverlay);

/* =========================
   HELPERS
========================= */
function updateDisplay(value) {
  display.value = value || "0";
}

function normalizeExpression(exp) {
  return exp
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/\^/g, "**")
    .replace(/(\d+)%/g, "($1/100)");
}

function safeEvaluate(expression) {
  try {
    const normalized = normalizeExpression(expression);
    const result = Function(`"use strict"; return (${normalized})`)();
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

function addToHistory(expression, result) {
  history.push({
    expression,
    result,
    time: new Date().toLocaleTimeString()
  });
  historyIndex = history.length;
  renderHistory();
}

function renderHistory() {
  historyBox.innerHTML = `<h3 style="margin-bottom:12px;">History</h3>`;

  if (!history.length) {
    historyBox.innerHTML += `<p>No calculations yet</p>`;
    return;
  }

  history
    .slice()
    .reverse()
    .forEach(item => {
      const row = document.createElement("div");
      row.style.cssText = `
        padding: 10px;
        border-bottom: 1px solid #333;
        cursor: pointer;
      `;

      row.innerHTML = `
        <div>${item.expression} = <strong>${item.result}</strong></div>
        <small style="opacity:.6">${item.time}</small>
      `;

      row.onclick = () => {
        currentInput = String(item.result);
        updateDisplay(currentInput);
        closeHistory();
      };

      historyBox.appendChild(row);
    });
}

function openHistory() {
  historyOverlay.style.display = "flex";
  historyOpen = true;
}

function closeHistory() {
  historyOverlay.style.display = "none";
  historyOpen = false;
}

/* =========================
   BUTTON INPUT
========================= */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("number") || btn.classList.contains("operator")) {
      currentInput += btn.textContent;
      updateDisplay(currentInput);
    }
  });
});

/* =========================
   CLEAR
========================= */
clearBtn.addEventListener("click", () => {
  currentInput = "";
  updateDisplay("0");
});

/* =========================
   BACKSPACE
========================= */
backspaceBtn.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
});

/* =========================
   EQUALS
========================= */
equalBtn.addEventListener("click", () => {
  if (!currentInput) return;

  const result = safeEvaluate(currentInput);

  if (result === null) {
    updateDisplay("Error");
    currentInput = "";
    return;
  }

  addToHistory(currentInput, result);
  currentInput = String(result);
  updateDisplay(currentInput);
});

/* =========================
   HISTORY BUTTON
========================= */
historyBtn.addEventListener("click", () => {
  historyOpen ? closeHistory() : openHistory();
});

historyOverlay.addEventListener("click", (e) => {
  if (e.target === historyOverlay) closeHistory();
});

/* =========================
   KEYBOARD SUPPORT
========================= */
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || ".+-*/%^".includes(key)) {
    e.preventDefault();

    const mapped =
      key === "*" ? "×" :
      key === "/" ? "÷" :
      key === "-" ? "−" : key;

    currentInput += mapped;
    updateDisplay(currentInput);
  }

  if (key === "Enter") {
    e.preventDefault();
    equalBtn.click();
  }

  if (key === "Backspace") {
    e.preventDefault();
    backspaceBtn.click();
  }

  if (key === "Escape") {
    historyOpen ? closeHistory() : clearBtn.click();
  }

  if (key === "ArrowUp" && history.length) {
    historyIndex = Math.max(0, historyIndex - 1);
    updateDisplay(history[historyIndex]?.expression || "");
  }

  if (key === "ArrowDown" && history.length) {
    historyIndex = Math.min(history.length - 1, historyIndex + 1);
    updateDisplay(history[historyIndex]?.expression || "");
  }
});