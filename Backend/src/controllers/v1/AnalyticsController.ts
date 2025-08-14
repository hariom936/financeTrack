// src/controllers/AnalyticsController.ts
import {
  JsonController, Get, Req, Res, UseBefore
} from "routing-controllers";
import { Service } from "typedi";
import { authenticate } from "../../middleware/auth";
import { ResponseService } from "../../services/ResponseService";
import { AnalyticsService } from "../../services/AnalyticsService";
import { apiRoute } from "../../utils/apiSemver";
import { action, component } from "../../constant/api";

@Service()
@JsonController(apiRoute(component.ANALYTICS))
@UseBefore(authenticate)
export class AnalyticsController {
  constructor(
    private responseService: ResponseService,
    private analyticsService: AnalyticsService
  ) {}

  @Get(action.SPENDING)
  async spendingByCategory(@Req() req: any, @Res() res: any) {
    const userId = req.user.userId;
    console.log("userId:", userId);
    const data = await this.analyticsService.getSpendingByCategory(userId);
    console.log("Result:", data);
    return this.responseService.success({ res, data });
  }

  @Get(action.MONTHLY)
  async monthlyTrend(@Req() req: any, @Res() res: any) {
    const data = await this.analyticsService.getMonthlyTrend(req.user.userId);
    return this.responseService.success({ res, data });
  }

  @Get(action.INCOME)
  async incomeVsExpense(@Req() req: any, @Res() res: any) {
    const data = await this.analyticsService.getIncomeVsExpense(req.user.userId);
    return this.responseService.success({ res, data });
  }
}
