import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const income = this.transactions.filter(trans => trans.type === "income")
      .map(tr => tr.value).reduce((initial, curr) => initial + curr, 0);

    const outcome = this.transactions.filter(trans => trans.type === "outcome")
      .map(tr => tr.value).reduce((initial, curr) => initial + curr, 0);

    return { income, outcome, total: income - outcome }
  }

  public create({ title, value, type }: TransactionDto): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
