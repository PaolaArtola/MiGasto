export interface Transaction {
  id: string;
  description: string;
  method: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  icon: string;
}

export interface ExpenseCategory {
  name: string;
  percentage: number;
  color: string;
  icon: string;
}

export interface BalanceCard {
  amount: number;
  change: number;
  trend: 'positive' | 'negative';
}

export interface DashboardData {
  balance: BalanceCard;
  income: BalanceCard;
  expenses: BalanceCard;
  expenseCategories: ExpenseCategory[];
  transactions: Transaction[];
}

export interface NavigationTab {
  id: string;
  label: string;
  active: boolean;
}

export interface PeriodOption {
  id: string;
  label: string;
  active: boolean;
}