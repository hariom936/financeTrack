import {
  JsonController, Post, Get, Put, Delete, Body, QueryParam, Res, UseBefore
} from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";
import { RoleService } from "../../services/RoleService";
import { ResponseService } from "../../services/ResponseService";
import { CreateRole, UpdateRole } from "../../validations/RoleValidation";
import { apiRoute } from "../../utils/apiSemver";
import { component, action } from "../../constant/api";
import { authenticate } from "../../middleware/auth";
import { authorizeRoles } from "../../middleware/rbac";

@Service()
@JsonController(apiRoute(component.ROLE))
@UseBefore(authenticate)                 // 1. Decodes JWT, sets req.user
@UseBefore(authorizeRoles('admin'))
export class RoleController {
  constructor(
    private roleService: RoleService,
    private responseService: ResponseService
  ) {}

  @Post(action.ADD)
  async create(@Body() body: CreateRole, @Res() res: Response) {
    const role = await this.roleService.createRole(body.name);
    return this.responseService.success({
      res, data: role, message: "Role created successfully"
    });
  }

  @Get(action.LIST)
  async list(@Res() res: Response) {
    const roles = await this.roleService.listRoles();
    return this.responseService.success({ res, data: roles });
  }

  @Put(action.UPDATE)
  async update(
    @QueryParam("roleId") roleId: number,
    @Body() body: UpdateRole,
    @Res() res: Response
  ) {
    const role = await this.roleService.updateRole(roleId, body.name);
    return this.responseService.success({ res, data: role });
  }

  @Delete(action.DELETE)
  async remove(
    @QueryParam("roleId") roleId: number,
    @Res() res: Response
  ) {
    await this.roleService.deleteRole(roleId);
    return this.responseService.success({ res, message: "Role deleted successfully" });
  }
}
