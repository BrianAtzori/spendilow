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
}

export interface SpendilowUserLogin {
  email: string;
  password: string;
}

export interface SpendilowBudgetAPIResponse {
  budget: SpendilowBudget;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: SpendilowTransaction[];
}

export interface ExternalCallResult {
  success?: boolean;
  budgets?: SpendilowBudget[];
  transaction?: SpendilowTransaction;
}

export interface SpendilowError {
  state?: boolean;
  message?: string;
}