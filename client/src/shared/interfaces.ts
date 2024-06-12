export interface SpendilowUser {
  id?: string;
  email: string;
  password?: string;
  savings: number;
  salary: number;
  profileimage: string;
  workfield: string;
  username: string;
  isMFAActive: boolean;
}

export interface SpendilowTransaction {
  id?: string;
  transaction_date: Date | string;
  amount: number;
  title: string;
  notes: string;
  tags: string;
  transaction_type: string;
  target_id: string | null;
}

export interface SpendilowBudget {
  id?: string;
  name?: string;
  description?: string;
  total?: number;
}

export interface SpendilowUserLogin {
  email: string;
  password: string;
}

export interface SpendilowBudgetAPIResponse {
  budget: SpendilowBudget;
  transactions: SpendilowTransaction[];
}

export interface ExternalCallResult {
  success?: boolean;
  budgets?: SpendilowBudget[];
  transaction?: SpendilowTransaction;
  transactions?: SpendilowTransaction[];
  spendilowUser?: SpendilowUser;
}

export interface SpendilowError {
  state?: boolean;
  message?: string;
}

export interface SpendilowSuccess {
  state?: boolean;
  message?: string;
}
