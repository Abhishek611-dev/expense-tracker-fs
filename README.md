---

# 💰 Expense Tracker (Full-Stack)

A resilient, production-oriented personal finance tool built to record and review expenses. This project focuses on **data correctness** and **system reliability** under real-world conditions like network failures and duplicate form submissions.

### 🌐 Links

* **Live Application:** [https://expense-tracker-fs-m07f.onrender.com]
* **GitHub Repository:** [https://github.com/Abhishek611-dev/expense-tracker-fs]

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

To avoid the floating-point errors inherent in JavaScript/Python `float` types (e.g., `0.1 + 0.2 != 0.3`), I used:

* **Backend:** `DecimalField` in Django to store amounts with exact precision.
* **Frontend:** `parseFloat().toFixed(2)` for consistent display of currency.

### 2. Resilience to Network Issues (Idempotency)

Per the assignment requirements for handling "retries" and "clicking submit multiple times," I implemented **Idempotency Keys**:

* **Frontend:** Each `POST` request generates a unique UUID (Idempotency-Key) via `crypto.randomUUID()`.
* **Backend:** The `django-idempotency-key` middleware ensures that if the same key is sent twice (due to a retry or double-click), the server returns the original success response without creating a duplicate expense entry in the database.

### 3. Static File Management

For production performance on Render, I used **WhiteNoise**. This allows the Django application to serve its own static files (like `app.js`) efficiently without needing a complex Nginx setup, ensuring the UI loads reliably every time.

---

## ⚖️ Trade-offs & Limitations

* **Database:** Used **SQLite** for persistence. While PostgreSQL is preferred for high-concurrency production, SQLite was chosen here for zero-config portability within the assignment timebox.
* **Authentication:** Intentionally omitted to focus on the core requirement of expense management and idempotency. The system assumes a single-user environment.
* **State Management:** Chose **Vanilla JavaScript** over a framework like React to keep the bundle size small and demonstrate a deep understanding of DOM manipulation and Fetch API.

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

* **Test Filter:** Add an expense under "Food" and another under "Work," then use the dropdown to verify only the relevant items appear.
* **Test Sorting:** Add expenses with different dates; verify the newest appears at the top.
* **Test Resilience:** In the browser console, you can see the `Idempotency-Key` being sent with every `POST` request to ensure no duplicates occur during retries.

---

### 💡 Final Step for You:

1. Create a file named `README.md` in your project root.
2. Paste the content above.
3. **Update the links** at the top with your actual Render and GitHub URLs.
4. Commit and push:
```bash
git add README.md
git commit -m "docs: complete production readme for submission"
git push origin main

```
