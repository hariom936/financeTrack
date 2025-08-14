import { Service } from "typedi";
import { Repository } from "typeorm";
import AppDataSource from "../config/dbconfig";
import { Transactions } from "../entity/Transactions ";
import { ApiError } from "../utils/Apierror";
import httpStatus from "http-status";
import { CreateTransaction, UpdateTransaction } from "../validations/TransactionValidation";

@Service()
export class TransactionService {
  private tranRepo: Repository<Transactions>;

  constructor() {
    this.tranRepo = AppDataSource.getRepository(Transactions);
  }

  async createTransaction(userId: number, data: CreateTransaction) {
  const tran = this.tranRepo.create({
    amount: data.amount,
    type: data.type,
    description: data.description,
    date: new Date(data.date), // ✅ convert string to Date
    categoryId: data.categoryId,
    userId
  });
  return await this.tranRepo.save(tran);
}


  async listTransactions(userId: number, role: string) {
    if (role === 'admin') {
      return this.tranRepo.find({ relations: ['category', 'user'] });
    }
    return this.tranRepo.find({ where: { userId }, relations: ['category'] });
  }

  async updateTransaction(id: number, userId: number, role: string, data: UpdateTransaction) {
  const tran = await this.tranRepo.findOne({ where: { id } });
  if (!tran) throw new ApiError(httpStatus.NOT_FOUND, "Transaction not found");
  if (role !== 'admin' && tran.userId !== userId)
    throw new ApiError(httpStatus.FORBIDDEN, "Not allowed");

  if (data.date) {
    data.date = new Date(data.date) as any; // convert string to Date
  }

  Object.assign(tran, data);
  return await this.tranRepo.save(tran);
}

  async deleteTransaction(id: number, userId: number, role: string) {
    const tran = await this.tranRepo.findOne({ where: { id } });
    if (!tran) throw new ApiError(httpStatus.NOT_FOUND, "Transaction not found");
    if (role !== 'admin' && tran.userId !== userId)
      throw new ApiError(httpStatus.FORBIDDEN, "Not allowed");

    return await this.tranRepo.remove(tran);
  }
}
