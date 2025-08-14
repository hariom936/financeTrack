import { JsonController, Post, Get, Put, Delete, Body, QueryParam, Res, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { CategoryService } from "../../services/CategoryService";
import { ResponseService } from "../../services/ResponseService";
import { CreateCategory, UpdateCategory } from "../../validations/CategoryValidation";
import { authenticate } from "../../middleware/auth";
import { authorizeRoles } from "../../middleware/rbac";
import { apiRoute } from "../../utils/apiSemver";
import { action, component } from "../../constant/api";

@Service()
@JsonController(apiRoute(component.CATEGORY))
@UseBefore(authenticate)
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private responseService: ResponseService
  ) {}

  // Admin & User only
  @Post(action.ADD)
  @UseBefore(authorizeRoles('admin', 'user'))
  async create(@Body() body: CreateCategory, @Res() res: any) {
    const category = await this.categoryService.createCategory(body);
    return this.responseService.success({ res, data: category, message: "Category created successfully" });
  }

  // All roles (view)
  @Get('/list')
  async list(@Res() res: any) {
    const cats = await this.categoryService.listCategories();
    return this.responseService.success({ res, data: cats });
  }

  // Admin & User only
  @Put('/update')
  @UseBefore(authorizeRoles('admin', 'user'))
  async update(@QueryParam("id") id: number, @Body() body: UpdateCategory, @Res() res: any) {
    const cat = await this.categoryService.updateCategory(id, body);
    return this.responseService.success({ res, data: cat });
  }

  // Admin & User only
  @Delete('/delete')
  @UseBefore(authorizeRoles('admin', 'user'))
  async delete(@QueryParam("id") id: number, @Res() res: any) {
    await this.categoryService.deleteCategory(id);
    return this.responseService.success({ res, message: "Category deleted successfully" });
  }
}
