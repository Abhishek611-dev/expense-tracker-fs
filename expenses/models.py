from django.db import models

# Create your models here.

class Expense(models.Model):
    amount = models.DecimalField(
        max_digits=10, decimal_places=2
    )  # real money safe
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.category} - {self.amount}"

class IdempotencyKey(models.Model):
    key = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)


