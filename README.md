# 🧮 Calculator App

A modern, responsive calculator built with HTML, CSS, and Vanilla JavaScript, featuring full keyboard support, calculation history, and mobile-first usability.

> This project was built as a complete, functional assessment, with a focus on correctness, UX, and clean architecture.


---

## ✨ Features

### ✅ Core Calculator

- Digits 0–9
- Operators + − × ÷ % ^
- Decimal support
- Clear (C) and Backspace (⌫)
- Accurate expression evaluation
- Error handling for invalid input


### 📜 Calculation History

> Automatically saves completed calculations

Each entry includes:

- Expression
- Result
- Time of calculation

Click a history item to reuse the result
History displayed in a modal overlay
Centered popup on desktop
Full-screen friendly on mobile


### ⌨️ Keyboard Support (Desktop Optimized)

- Numbers and operators from keyboard
- Enter → calculate
- Backspace → delete last character
- Esc → clear or close history
- Arrow ↑ / ↓ → scroll through calculation history


### 📱 Responsive & Mobile-Friendly

- Touch-optimized buttons
- Scales cleanly on phones, tablets, and desktops
- Works without external libraries or frameworks


---

## 🛠 Tech Stack

- HTML5 — semantic structure
- CSS3 — responsive layout, dark UI, smooth interactions
- Vanilla JavaScript — logic, history, keyboard handling

No frameworks. No dependencies. No eval.

---

## 📂 Project Structure

```
calculator-app/
│
├── index.html
├── assets/
│   ├── styles.css
│   └── script.js
├── project_doc.md
└── README.md
```

---

## 🧠 How It Works

### Expression Handling

* Visual operators (× ÷ − ^) are internally normalized
* % is converted into a valid mathematical operation
* Expressions are safely evaluated using controlled function execution


### History System

* Calculations are stored in memory
* Navigation supported via:
* History button (UI)
* Arrow keys (keyboard)

Results can be reused instantly


---

## 🚀 Getting Started

1. Clone or download the project
2. Open index.html in your browser
3. Start calculating 🎉

No setup required.

---

## 🧪 Supported Calculations

Input	Result

- 2 + 3 × 4	14
- 10%	0.1
- 2 ^ 3	8
- 50 + 10%	50.1

---

## 🎯 Assessment Coverage

✔ HTML structure
✔ CSS styling & responsiveness
✔ JavaScript functionality
✔ Keyboard support
✔ History feature
✔ Mobile compatibility

> All required and bonus criteria implemented.

