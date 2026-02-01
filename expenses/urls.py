from django.urls import path
from .views import ExpenseListCreateView,expense_ui

urlpatterns = [
    # path('expenses', ExpenseListCreateView.as_view()),
    path('expenses/', ExpenseListCreateView.as_view(), name='expense-list-create'),
    path('', expense_ui),
]
