# 💰 Personal Finance Tool: Expense Tracker

A resilient, full-stack application built to record and review personal expenses. This project is designed to handle real-world challenges like unreliable networks, duplicate submissions, and precise financial data handling.

### 🌐 Live Links

Live Application: https://expense-tracker-fs-m07f.onrender.com

GitHub Repository: https://github.com/Abhishek611-dev/expense-tracker-fs

---

## 🚀 Key Features

* **Expense Creation:** Record amount, category, description, and date.
* **Dynamic List:** A responsive table showing all recorded expenses.
* **Server-Side Filtering:** Filter by category via API query parameters.
* **Server-Side Sorting:** Default "Newest First" sorting for better UX.
* **Live Totals:** Automatic calculation of totals based on the current filtered view.

---

## 🛠️ Production Design Decisions

### 1. Data Correctness (Money Handling)

To prevent floating-point errors (e.g.,  resulting in ), I implemented:

* **Backend:** Used Django `DecimalField` for high-precision storage.
* **Frontend:** Used `parseFloat().toFixed(2)` to ensure currency is always displayed correctly.

### 2. Resilience (Idempotency)

To satisfy the requirement of handling "unreliable networks" and "multiple clicks":

* **Frontend:** Every `POST` request generates a unique `Idempotency-Key` using `crypto.randomUUID()`.
* **Backend:** The system uses `django-idempotency-key` middleware. If a user double-clicks or a network retry occurs, the server recognizes the key and prevents duplicate entries.

### 3. Static Asset Serving

I utilized **WhiteNoise** to serve static files (like `app.js` and `styles.css`) directly through Django. This ensures the application is self-contained and loads reliably on production platforms like Render.

---

## ⚖️ Trade-offs

* **Database:** Used **SQLite** for this submission to ensure the project is lightweight and zero-configuration. For a large-scale production app, I would migrate to PostgreSQL.
* **Auth:** Authentication was omitted to focus on the core logic of expense tracking and API idempotency within the assignment timeframe.

---

## ⚙️ Local Setup

1. **Clone & Enter**
```bash
git clone https://github.com/Abhishek611-dev/expense-tracker-fs.git
cd expense-tracker-fs

```


2. **Install**
```bash
pip install -r requirements.txt

```


3. **Migrate & Run**
```bash
python manage.py migrate
python manage.py runserver

```


Visit: `http://127.0.0.1:8000/`

---

## 🧪 Verification

* **Test Filtering:** Use the category dropdown; the "Total" will update dynamically based on the filtered results.
* **Test Sorting:** Add an expense with an older date; it will correctly appear below newer entries.
* **Test Resilience:** The browser console shows a unique `Idempotency-Key` for every submission, protecting your data from duplicates.

---

**Would you like me to show you how to verify the Idempotency-Key is working by using the "Network" tab in your browser?**
