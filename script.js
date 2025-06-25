let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

// Load history from localStorage on page load
window.onload = () => {
  loadHistory();
};

// Append value to display
function append(char) {
  if (display.innerText === "0" && char !== ".") {
    display.innerText = char;
  } else {
    display.innerText += char;
  }
}

// Clear display
function clearDisplay() {
  display.innerText = "0";
}

// Delete last character
function deleteChar() {
  if (display.innerText.length > 1) {
    display.innerText = display.innerText.slice(0, -1);
  } else {
    display.innerText = "0";
  }
}

// Evaluate expression
function calculate() {
  try {
    let expression = display.innerText.replace('^', '**').replace('÷', '/').replace('×', '*');
    let result = eval(expression);
    let historyEntry = `${display.innerText} = ${result}`;
    addToHistory(historyEntry);
    display.innerText = result;
  } catch {
    display.innerText = "Error";
  }
}

// Toggle dark/light theme
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// Add to history and save to localStorage
function addToHistory(entry) {
  const li = document.createElement("li");
  li.innerText = entry;
  li.onclick = () => reuseHistory(entry);
  historyList.prepend(li);

  let current = JSON.parse(localStorage.getItem("calcHistory")) || [];
  current.unshift(entry);
  localStorage.setItem("calcHistory", JSON.stringify(current.slice(0, 15)));
}

// Load history from localStorage
function loadHistory() {
  let saved = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyList.innerHTML = "";
  saved.forEach(entry => {
    const li = document.createElement("li");
    li.innerText = entry;
    li.onclick = () => reuseHistory(entry);
    historyList.appendChild(li);
  });
}

// Reuse clicked history
function reuseHistory(entry) {
  const parts = entry.split("=");
  if (parts.length === 2) {
    display.innerText = parts[0].trim();
  }
}

// Keyboard Support
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    append(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteChar();
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});
