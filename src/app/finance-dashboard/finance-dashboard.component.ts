import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { Transaction, ExpenseCategory } from './models/finance.models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-finance-dashboard',
  standalone: true, // ⬅️ This is likely present if you're seeing this error
  imports: [CommonModule],
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.css'],
})
export class FinanceDashboardComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(private router: Router) {}
  @ViewChild('expenseChart') expenseChartRef!: ElementRef<HTMLCanvasElement>;

  Math = Math;

  // Dashboard Data
  balance = {
    amount: 830.0,
    change: 8.2,
    trend: 'positive',
  };

  income = {
    amount: 1150.0,
    change: 5.0,
    trend: 'positive',
  };

  expenses = {
    amount: 320.0,
    change: +2.0,
    trend: 'positive',
  };

  expenseCategories: ExpenseCategory[] = [
    { name: 'House', percentage: 41.35, color: '#8b5cf6', icon: '🏠' },
    { name: 'Credit card', percentage: 21.51, color: '#ef4444', icon: '💳' },
    { name: 'Transportation', percentage: 13.47, color: '#06b6d4', icon: '🚗' },
    { name: 'Groceries', percentage: 9.97, color: '#10b981', icon: '🛒' },
    { name: 'Shopping', percentage: 3.35, color: '#6366f1', icon: '🛍️' },
  ];

  transactions: Transaction[] = [
    {
      id: '1',
      description: 'Orlando Rodrigues',
      method: 'Bank account',
      date: '2025/04/01',
      amount: 750.0,
      type: 'income',
      icon: '👤',
    },
    {
      id: '2',
      description: 'Netflix',
      method: 'Credit card',
      date: '2025/03/29',
      amount: 9.9,
      type: 'expense',
      icon: '🎬',
    },
    {
      id: '3',
      description: 'Spotify',
      method: 'Credit card',
      date: '2025/03/29',
      amount: 19.9,
      type: 'expense',
      icon: '🎵',
    },
    {
      id: '4',
      description: 'Carl Andrew',
      method: 'Bank account',
      date: '2025/03/27',
      amount: 400.0,
      type: 'income',
      icon: '👤',
    },
    {
      id: '5',
      description: 'Carrefour Market',
      method: 'Credit card',
      date: '2025/03/26',
      amount: 84.32,
      type: 'expense',
      icon: '🛒',
    },
    {
      id: '6',
      description: 'Amazon',
      method: 'Credit card',
      date: '2025/03/24',
      amount: 147.9,
      type: 'expense',
      icon: '📦',
    },
    {
      id: '7',
      description: 'Shopify',
      method: 'Credit card',
      date: '2025/03/21',
      amount: 57.98,
      type: 'expense',
      icon: '🛍️',
    },
  ];

  private expenseChart?: Chart;
  activeTab = 'Overview';
  activePeriod = 'This month';


  moveTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {
    // Component initialization
    console.log('Finance Dashboard initialized');
  }

  ngAfterViewInit() {
    this.createExpenseChart();
  }

  ngOnDestroy() {
    if (this.expenseChart) {
      this.expenseChart.destroy();
    }
  }

  // Navigation Methods
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  setActivePeriod(period: string) {
    this.activePeriod = period;
    if (period === 'This month') {
      this.balance = {
        amount: 830.0,
        change: 8.2,
        trend: 'positive',
      };

      this.income = {
        amount: 1150.0,
        change: 5.0,
        trend: 'positive',
      };

      this.expenses = {
        amount: 320.0,
        change: +2.0,
        trend: 'positive',
      };

      this.expenseCategories = [
        { name: 'House', percentage: 25.0, color: '#8b5cf6', icon: '🏠' },
        { name: 'Credit card', percentage: 15.0, color: '#ef4444', icon: '💳' },
        {
          name: 'Transportation',
          percentage: 50.0,
          color: '#06b6d4',
          icon: '🚗',
        },
        { name: 'Groceries', percentage: 10.0, color: '#10b981', icon: '🛒' },
        { name: 'Shopping', percentage: 0.0, color: '#6366f1', icon: '🛍️' },
      ];

      this.transactions = [
        {
          id: '1',
          description: 'Orlando Rodrigues',
          method: 'Bank account',
          date: '2025/04/01',
          amount: 750.0,
          type: 'income',
          icon: '👤',
        },
        {
          id: '2',
          description: 'Netflix',
          method: 'Credit card',
          date: '2025/03/29',
          amount: 9.9,
          type: 'expense',
          icon: '🎬',
        },
        {
          id: '3',
          description: 'Spotify',
          method: 'Credit card',
          date: '2025/03/29',
          amount: 19.9,
          type: 'expense',
          icon: '🎵',
        },
        {
          id: '4',
          description: 'Carl Andrew',
          method: 'Bank account',
          date: '2025/03/27',
          amount: 400.0,
          type: 'income',
          icon: '👤',
        },
        {
          id: '5',
          description: 'Carrefour Market',
          method: 'Credit card',
          date: '2025/03/26',
          amount: 84.32,
          type: 'expense',
          icon: '🛒',
        },
        {
          id: '6',
          description: 'Amazon',
          method: 'Credit card',
          date: '2025/03/24',
          amount: 147.9,
          type: 'expense',
          icon: '📦',
        },
        {
          id: '7',
          description: 'Shopify',
          method: 'Credit card',
          date: '2025/03/21',
          amount: 57.98,
          type: 'expense',
          icon: '🛍️',
        },
      ];
    } else if (period === 'Last month') {
      this.expenseCategories = [
        { name: 'House', percentage: 100.0, color: '#8b5cf6', icon: '🏠' },
        { name: 'Credit card', percentage: 0.0, color: '#ef4444', icon: '💳' },
        {
          name: 'Transportation',
          percentage: 0.0,
          color: '#06b6d4',
          icon: '🚗',
        },
        { name: 'Groceries', percentage: 0.0, color: '#10b981', icon: '🛒' },
        { name: 'Shopping', percentage: 0.0, color: '#6366f1', icon: '🛍️' },
      ];
      this.balance = {
        amount: 1079.5,
        change: 8.2,
        trend: 'positive',
      };

      this.income = {
        amount: 1200.0,
        change: 5.0,
        trend: 'positive',
      };

      this.expenses = {
        amount: 120.5,
        change: -2.0,
        trend: 'positive',
      };

      this.transactions = [
        {
          id: '8',
          description: 'Freelance Project',
          method: 'Bank account',
          date: '2025/04/10',
          amount: 1200.0,
          type: 'income',
          icon: '💼',
        },
        {
          id: '9',
          description: 'Electric Bill',
          method: 'Credit card',
          date: '2025/04/15',
          amount: 75.5,
          type: 'expense',
          icon: '💡',
        },
        {
          id: '10',
          description: 'Gym Membership',
          method: 'Credit card',
          date: '2025/04/02',
          amount: 45.0,
          type: 'expense',
          icon: '🏋️',
        },
      ];
    } else if (period === 'This year') {
      this.expenseCategories = [
        { name: 'House', percentage: 0.0, color: '#8b5cf6', icon: '🏠' },
        {
          name: 'Credit card',
          percentage: 23.95,
          color: '#ef4444',
          icon: '💳',
        },
        {
          name: 'Transportation',
          percentage: 0.0,
          color: '#06b6d4',
          icon: '🚗',
        },
        { name: 'Groceries', percentage: 76.05, color: '#10b981', icon: '🛒' },
        { name: 'Shopping', percentage: 0.0, color: '#6366f1', icon: '🛍️' },
      ];
      this.balance = {
        amount: 374.75,
        change: -15.5,
        trend: 'negative',
      };

      this.income = {
        amount: 500.0,
        change: -20.0,
        trend: 'negative',
      };

      this.expenses = {
        amount: 125.25,
        change: 4.2,
        trend: 'negative',
      };

      this.transactions = [
        {
          id: '11',
          description: 'Bonus Payout',
          method: 'Bank account',
          date: '2025/01/20',
          amount: 500.0,
          type: 'income',
          icon: '🎉',
        },
        {
          id: '12',
          description: 'Grocery Store',
          method: 'Credit card',
          date: '2025/03/05',
          amount: 95.25,
          type: 'expense',
          icon: '🛒',
        },
        {
          id: '13',
          description: 'Mobile Plan',
          method: 'Credit card',
          date: '2025/02/10',
          amount: 30.0,
          type: 'expense',
          icon: '📱',
        },
      ];
    } else if (period === 'Last 12 months') {
      this.expenseCategories = [
        { name: 'House', percentage: 0.0, color: '#8b5cf6', icon: '🏠' },
        {
          name: 'Credit card',
          percentage: 21.05,
          color: '#ef4444',
          icon: '💳',
        },
        {
          name: 'Transportation',
          percentage: 78.95,
          color: '#06b6d4',
          icon: '🚗',
        },
        { name: 'Groceries', percentage: 0.0, color: '#10b981', icon: '🛒' },
        { name: 'Shopping', percentage: 0.0, color: '#6366f1', icon: '🛍️' },
      ];

      this.balance = {
        amount: 430.0,
        change: 3.1,
        trend: 'positive',
      };

      this.income = {
        amount: 1000.0,
        change: 6.0,
        trend: 'positive',
      };

      this.expenses = {
        amount: 570.0,
        change: 12.5,
        trend: 'negative',
      };

      this.transactions = [
        {
          id: '14',
          description: 'Sold Used Laptop',
          method: 'Bank account',
          date: '2025/07/15',
          amount: 300.0,
          type: 'income',
          icon: '💻',
        },
        {
          id: '15',
          description: 'Flight Tickets',
          method: 'Credit card',
          date: '2025/08/05',
          amount: 450.0,
          type: 'expense',
          icon: '✈️',
        },
        {
          id: '16',
          description: 'Online Course',
          method: 'Credit card',
          date: '2025/10/21',
          amount: 120.0,
          type: 'expense',
          icon: '📚',
        },
        {
          id: '17',
          description: 'Tax Refund',
          method: 'Bank account',
          date: '2025/09/12',
          amount: 700.0,
          type: 'income',
          icon: '💰',
        },
      ];
    }

    this.expenseChart?.destroy();
    this.createExpenseChart();
  }

  // Action Methods
  addIncome() {
    console.log('Add income clicked');
    // Implement add income logic
  }

  addExpense() {
    console.log('Add expense clicked');
    // Implement add expense logic
  }

  transferMoney() {
    console.log('Transfer money clicked');
    // Implement transfer money logic
  }

  // Chart Methods
  private createExpenseChart() {
    const ctx = this.expenseChartRef.nativeElement.getContext('2d');

    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'doughnut' as ChartType,
      data: {
        labels: this.expenseCategories.map((cat) => cat.name),
        datasets: [
          {
            data: this.expenseCategories.map((cat) => cat.percentage),
            backgroundColor: this.expenseCategories.map((cat) => cat.color),
            borderWidth: 0,
            // cutout: '60%'
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.label}: ${context.parsed}%`;
              },
            },
          },
        },
      },
    };

    this.expenseChart = new Chart(ctx, config);
  }
}
