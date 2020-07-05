import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: "income" | "outcome"; //string com valores: income ou outcome

}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    //verifica se o type é diferente de income e outcome
    if(!['income', 'outcome'].includes(type)) {
      throw new Error ('Tipo de transação inválida!');
    }


    const { total } = this.transactionsRepository.getBalance(); //recupera o total
    if (type == "outcome" && total < value) {
      throw new Error("Você não tem saldo suficiente!");
    } 
    const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });
      return transaction;
  }
}

export default CreateTransactionService;
