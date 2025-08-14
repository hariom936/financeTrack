// src/services/AnalyticsService.ts
import { Service } from "typedi";
import AppDataSource from "../config/dbconfig";
import { Transactions } from "../entity/Transactions ";

@Service()
export class AnalyticsService {
  private repo = AppDataSource.getRepository(Transactions);

  async getSpendingByCategory(userId: number) {
    return this.repo
      .createQueryBuilder("tran")
      .select("cat.name", "category")
      .addSelect("SUM(tran.amount)", "total")
      .innerJoin("tran.category", "cat")
      .where("tran.userId = :userId AND tran.type = 'expense'", { userId })
      .groupBy("cat.name")
      .getRawMany();
  }

  async getMonthlyTrend(userId: number) {
    return this.repo
      .createQueryBuilder("tran")
      .select("TO_CHAR(tran.date, 'YYYY-MM')", "month")
      .addSelect("SUM(CASE WHEN tran.type = 'income' THEN tran.amount ELSE 0 END)", "total_income")
      .addSelect("SUM(CASE WHEN tran.type = 'expense' THEN tran.amount ELSE 0 END)", "total_expense")
      .where("tran.userId = :userId", { userId })
      .groupBy("month")
      .orderBy("month")
      .getRawMany();
  }

  async getIncomeVsExpense(userId: number) {
    return this.repo
      .createQueryBuilder("tran")
      .select("SUM(CASE WHEN tran.type = 'income' THEN tran.amount ELSE 0 END)", "income")
      .addSelect("SUM(CASE WHEN tran.type = 'expense' THEN tran.amount ELSE 0 END)", "expense")
      .where("tran.userId = :userId", { userId })
      .getRawOne();
  }
}
