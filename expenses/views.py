from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction

from .models import Expense, IdempotencyKey
from .serializers import ExpenseSerializer

class ExpenseListCreateView(APIView):

    def post(self, request):
        idem_key = request.headers.get("Idempotency-Key")

        if not idem_key:
            return Response(
                {"error": "Idempotency-Key header required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if IdempotencyKey.objects.filter(key=idem_key).exists():
            return Response(
                {"message": "Request already processed"},
                status=status.HTTP_200_OK
            )

        serializer = ExpenseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            expense = serializer.save()
            IdempotencyKey.objects.create(key=idem_key)

        return Response(
            ExpenseSerializer(expense).data,
            status=status.HTTP_201_CREATED
        )
    
    

    def get(self, request):
        qs = Expense.objects.all()

        category = request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)

        sort = request.query_params.get('sort')
        if sort == 'date_desc':
            qs = qs.order_by('-date')

        total = sum(e.amount for e in qs)

        serializer = ExpenseSerializer(qs, many=True)

        return Response({
            "expenses": serializer.data,
            "total": total
        })
    
def expense_ui(request):
    return render(request, "index.html")
