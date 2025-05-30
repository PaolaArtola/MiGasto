import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction, ExpenseCategory, DashboardData } from '../models/finance.models';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor() { }

  // Mock data - in real app this would come from API
  private mockTransactions: Transaction[] = [
    {
      id: '1',
      description: 'Orlando Rodrigues',
      method: 'Bank account',
      date: '2025/04/01',
      amount: 750.00,
      type: 'income',
      icon: '👤'
    },
    {
      id: '2',
      description: 'Netflix',
      method: 'Credit card',
      date: '2025/03/29',
      amount: 9.90,
      type: 'expense',
      icon: '🎬'
    },
    {
      id: '3',
      description: 'Spotify',
      method: 'Credit card',
      date: '2025/03/29',
      amount: 19.90,
      type: 'expense',
      icon: '🎵'
    },
    {
      id: '4',
      description: 'Carl Andrew',
      method: 'Bank account',
      date: '2025/03/27',
      amount: 400.00,
      type: 'income',
      icon: '👤'
    },
    {
      id: '5',
      description: 'Carrefour Market',
      method: 'Credit card',
      date: '2025/03/26',
      amount: 84.33,
      type: 'expense',
      icon: '🛒'
    },
    {
      id: '6',
      description: 'Amazon',
      method: 'Credit card',
      date: '2025/03/24',
      amount: 147.90,
      type: 'expense',
      icon: '📦'
    },
    {
      id: '7',
      description: 'Shopify',
      method: 'Credit card',
      date: '2025/03/21',
      amount: 57.98,
      type: 'expense',
      icon: '🛍️'
    }
  ];

  private mockExpenseCategories: ExpenseCategory[] = [
    { name: 'House', percentage: 41.35, color: '#8b5cf6', icon: '🏠' },
    { name: 'Credit card', percentage: 21.51, color: '#ef4444', icon: '💳' },
    { name: 'Transportation', percentage: 13.47, color: '#06b6d4', icon: '🚗' },
    { name: 'Groceries', percentage: 9.97, color: '#10b981', icon: '🛒' },
    { name: 'Shopping', percentage: 3.35, color: '#6366f1', icon: '🛍️' }
  ];

  // Get dashboard data
  getDashboardData(): Observable<DashboardData> {
    const dashboardData: DashboardData = {
      balance: {
        amount: 5502.45,
        change: 12.5,
        trend: 'positive'
      },
      income: {
        amount: 9450.00,
        change: 27,
        trend: 'positive'
      },
      expenses: {
        amount: 3945.55,
        change: 15,
        trend: 'negative'
      },
      expenseCategories: this.mockExpenseCategories,
      transactions: this.mockTransactions
    };

    return of(dashboardData);
  }

  // Get transactions
  getTransactions(): Observable<Transaction[]> {
    return of(this.mockTransactions);
  }

  // Get expense categories
  getExpenseCategories(): Observable<ExpenseCategory[]> {
    return of(this.mockExpenseCategories);
  }

  // Add new transaction
  addTransaction(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    
    this.mockTransactions.unshift(newTransaction);
    return of(newTransaction);
  }

  // Delete transaction
  deleteTransaction(id: string): Observable<boolean> {
    const index = this.mockTransactions.findIndex(t => t.id === id);
    if (index > -1) {
      this.mockTransactions.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Calculate totals
  calculateTotals(): Observable<{income: number, expenses: number, balance: number}> {
    const income = this.mockTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = this.mockTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    
    return of({ income, expenses, balance });
  }

}