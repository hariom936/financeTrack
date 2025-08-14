import {
  JsonController, Post, Get, Put, Delete, Body, QueryParam, Req, Res, UseBefore
} from "routing-controllers";
import { Service } from "typedi";
import { TransactionService } from "../../services/TransactionService";
import { ResponseService } from "../../services/ResponseService";
import { CreateTransaction, UpdateTransaction } from "../../validations/TransactionValidation";
import { apiRoute } from "../../utils/apiSemver";
import { action, component } from "../../constant/api";
import { authenticate } from "../../middleware/auth";
import { authorizeRoles } from "../../middleware/rbac";

@Service()
@JsonController(apiRoute(component.TRANSACTION))
@UseBefore(authenticate)
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private responseService: ResponseService
  ) {}

  @Post(action.ADD)
  @UseBefore(authorizeRoles('admin', 'user'))
  async create(@Req() req: any, @Body() body: CreateTransaction, @Res() res: any) {
    const tran = await this.transactionService.createTransaction(req.user.userId, body);
    return this.responseService.success({ res, data: tran });
  }

  @Get(action.LIST)
  async list(@Req() req: any, @Res() res: any) {
    const list = await this.transactionService.listTransactions(req.user.userId, req.user.role);
    return this.responseService.success({ res, data: list });
  }

  @Put(action.UPDATE)
  @UseBefore(authorizeRoles('admin', 'user'))
  async update(@Req() req: any, @QueryParam("id") id: number, @Body() body: UpdateTransaction, @Res() res: any) {
    const tran = await this.transactionService.updateTransaction(id, req.user.userId, req.user.role, body);
    return this.responseService.success({ res, data: tran });
  }

  @Delete(action.DELETE)
  @UseBefore(authorizeRoles('admin', 'user'))
  async delete(@Req() req: any, @QueryParam("id") id: number, @Res() res: any) {
    await this.transactionService.deleteTransaction(id, req.user.userId, req.user.role);
    return this.responseService.success({ res, message: "Transaction deleted successfully" });
  }
}
