---

# 💰 Expense Tracker (Full-Stack)

A resilient, production-oriented personal finance tool built to record and review expenses. This project focuses on **data correctness** and **system reliability** under real-world conditions like network failures and duplicate form submissions.

### 🌐 Links

* **Live Application:** [https://expense-tracker-fs-m07f.onrender.com](https://expense-tracker-fs-m07f.onrender.com)
* **GitHub Repository:** [https://github.com/Abhishek611-dev/expense-tracker-fs](https://github.com/Abhishek611-dev/expense-tracker-fs)

---

## 🚀 Key Features

* **Create Expenses:** Record amount, category, description, and date.
* **List & Review:** View all expenses in a clean, responsive table.
* **Server-Side Filtering:** Filter expenses by category via API query parameters.
* **Server-Side Sorting:** Sort expenses by date (Newest First) as the default view.
* **Live Totals:** Real-time calculation of the total for the currently filtered list.

---

## 🛠️ Production-Ready Design Decisions

### 1. Data Correctness (Money Handling)

To avoid the floating-point errors inherent in JavaScript/Python `float` types, I used:

* **Backend:** `DecimalField` in Django to store amounts with exact precision.
* **Frontend:** `parseFloat().toFixed(2)` for consistent display of currency.

### 2. Resilience to Network Issues (Idempotency)

I implemented **Idempotency Keys** to handle "retries" and "double-clicking":

* **Frontend:** Each `POST` request generates a unique UUID (Idempotency-Key) via `crypto.randomUUID()`.
* **Backend:** The `django-idempotency-key` middleware ensures that if the same key is sent twice, the server returns the original success response without creating a duplicate.

### 3. Static File Management

For production performance on Render, I used **WhiteNoise**. This allows the Django application to serve its own static files (like `app.js`) efficiently without needing a complex Nginx setup.

---

## ⚖️ Trade-offs & Limitations

* **Database:** Used **SQLite** for persistence to ensure zero-config portability within the assignment timebox.
* **Authentication:** Intentionally omitted to focus on the core requirements of expense management and idempotency.
* **State Management:** Chose **Vanilla JavaScript** to keep the bundle size small and demonstrate core DOM manipulation skills.

---

## ⚙️ Local Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/Abhishek611-dev/expense-tracker-fs.git
cd expense-tracker-fs

```


2. **Install Dependencies**
```bash
pip install -r requirements.txt

```


3. **Database Setup**
```bash
python manage.py migrate

```


4. **Run the Server**
```bash
python manage.py runserver

```


Access the UI at `http://127.0.0.1:8000/`.

---

## 🧪 Testing the Requirements

* **Test Filter:** Add different categories and use the dropdown to verify filtering.
* **Test Sorting:** Verify that the newest expenses always appear at the top.
* **Test Resilience:** Observe the `Idempotency-Key` in the browser's Network tab headers during every `POST` request.

---
