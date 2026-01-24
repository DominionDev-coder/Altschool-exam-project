// ============================
// VARIABLES
// ============================
let currentInput = "";
let history = [];
let historyIndex = -1;

const display = document.getElementById("display");

// ============================
// UPDATE DISPLAY
// ============================
function updateDisplay() {
  display.value = currentInput || "0";
}

// ============================
// BUTTON HANDLERS
// ============================
function handleNumber(value) {
  currentInput += value;
  updateDisplay();
}

function handleOperator(operator) {
  if (!currentInput) return;
  const lastChar = currentInput[currentInput.length - 1];
  if ("+-×÷%^−".includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay();
}

function handleClear() {
  currentInput = "";
  updateDisplay();
}

function handleBackspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function handleEqual() {
  if (!currentInput) return;
  try {
    // Replace operators for JS eval
    const sanitized = currentInput
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/\^/g, "**");
    const result = eval(sanitized);
    const timestamp = new Date().toLocaleTimeString();
    history.push({ expression: currentInput, result, time: timestamp });
    currentInput = result.toString();
    historyIndex = history.length;
    updateDisplay();
  } catch {
    currentInput = "";
    display.value = "Error";
  }
}

function showHistory() {
  alert("History coming soon!");
}

// ============================
// BUTTON EVENT LISTENERS
// ============================

// Numbers
document.querySelectorAll(".number").forEach(btn => {
  btn.addEventListener("click", () => handleNumber(btn.textContent));
});

// Operators
document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => handleOperator(btn.textContent));
});

// Equal
document.querySelector(".equal").addEventListener("click", handleEqual);

// Clear
document.querySelector(".clear").addEventListener("click", handleClear);

// Backspace
document.querySelector(".backspace").addEventListener("click", handleBackspace);

// History
document.querySelector(".history").addEventListener("click", showHistory);

// ============================
// KEYBOARD SUPPORT
// ============================
document.addEventListener("keydown", e => {
  const key = e.key;

  if (!isNaN(key) || key === ".") handleNumber(key);
  else if (key === "Enter") handleEqual();
  else if (key === "Escape") handleClear();
  else if (["+", "-", "*", "/", "%", "^"].includes(key)) handleOperator(key);

  // Arrow keys for history (placeholder)
  else if (key === "ArrowUp") {
    if (history.length === 0) return;
    historyIndex = Math.max(0, historyIndex - 1);
    currentInput = history[historyIndex].expression || "";
    updateDisplay();
  } else if (key === "ArrowDown") {
    if (history.length === 0) return;
    historyIndex = Math.min(history.length - 1, historyIndex + 1);
    currentInput = history[historyIndex]?.expression || "";
    updateDisplay();
  }
});