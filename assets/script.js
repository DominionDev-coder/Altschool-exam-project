/* ===============================
   CALCULATOR LOGIC
================================ */

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

/* ===============================
   BUTTON CLICK HANDLING
================================ */
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "C") {
      clearDisplay();
    } else if (value === "=") {
      calculateResult();
    } else {
      appendValue(value);
    }
  });
});

/* ===============================
   FUNCTIONS
================================ */

// Add value to display
function appendValue(value) {
  currentInput += value;
  display.value = currentInput;
}

// Clear everything
function clearDisplay() {
  currentInput = "";
  display.value = "";
}

// Calculate expression
function calculateResult() {
  try {
    // Replace symbols if needed
    const expression = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
    const result = Function(`return ${expression}`)();

    display.value = result;
    currentInput = result.toString();
  } catch (error) {
    display.value = "Error";
    currentInput = "";
  }
}