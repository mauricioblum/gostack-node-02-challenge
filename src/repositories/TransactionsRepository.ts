import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
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
    const sumIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, { value }: { value: number }) => sum + value, 0);

    const sumOutCome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, { value }: { value: number }) => sum + value, 0);

    const balance: Balance = {
      income: sumIncome,
      outcome: sumOutCome,
      total: sumIncome - sumOutCome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
