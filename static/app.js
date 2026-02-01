// 1. Use the full URL to avoid pathing issues between frontend and backend
// const API_URL = "http://127.0.0.1:8000/api/expenses";
const BASE_URL = window.location.origin;
const API_URL = `${BASE_URL}/api/expenses/`;

let currentCategory = "";

function idempotencyKey() {
  return crypto.randomUUID();
}

async function fetchExpenses() {
  try {
    // Adding a trailing slash if your backend (like Django) requires it
    let url = API_URL + "/?sort=date_desc";

    if (currentCategory) {
      url += `&category=${currentCategory}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch expenses');
    
    const data = await res.json();

    // Use empty arrays as fallback to prevent 'map' errors
    renderExpenses(data.expenses || []);
    renderTotal(data.total || 0);
    populateCategoryFilter(data.expenses || []);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

function renderExpenses(expenses) {
  const tbody = document.getElementById("expense-table");
  if (!tbody) return;
  
  tbody.innerHTML = "";

  expenses.forEach(e => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${e.date}</td>
      <td>${e.category}</td>
      <td>${e.description || ""}</td>
      <td>₹${parseFloat(e.amount).toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderTotal(total) {
  const totalElem = document.getElementById("total");
  if (totalElem) {
    totalElem.innerText = `Total: ₹${parseFloat(total).toFixed(2)}`;
  }
}

function populateCategoryFilter(expenses) {
  const select = document.getElementById("category-filter");
  if (!select) return;

  const categories = [...new Set(expenses.map(e => e.category))];
  
  // Save the current selection so it doesn't reset while typing
  const previousValue = select.value;

  select.innerHTML = `<option value="">All Categories</option>`;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });

  select.value = previousValue;
}

document.getElementById("expense-form").onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const payload = Object.fromEntries(formData.entries());

  // CRITICAL: Convert amount string to a Number
  payload.amount = parseFloat(payload.amount);

  try {
    const response = await fetch(API_URL + "/", { // Added trailing slash
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey()
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log("Success: Expense added");
      e.target.reset();
      await fetchExpenses(); // Refresh the list immediately
    } else {
      const errorText = await response.text();
      console.error("Server refused request:", errorText);
      alert("Error saving expense. Check console for details.");
    }
  } catch (err) {
    console.error("Network connection error:", err);
    alert("Could not connect to the server.");
  }
};

document.getElementById("category-filter").onchange = (e) => {
  currentCategory = e.target.value;
  fetchExpenses();
};

document.getElementById("sort-date").onclick = (e) => {
  e.preventDefault();
  fetchExpenses();
};

// Initial load when page opens
fetchExpenses();
