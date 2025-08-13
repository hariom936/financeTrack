import {
  JsonController,
  Get,
  Post,
  Body,
  Req,
  Res,
  QueryParams,
  Patch,
  Delete,
} from "routing-controllers";
import { Service } from "typedi";
import { ResponseService } from "../../services/ResponseService";
import {
  CreateUser,
  LoginUser,
  UpdateUser,
  UserListing,
} from "../../validations/UserValidation";
import messages from "../../constant/messages";
import { action, component } from "../../constant/api";
import { Request, Response } from "express";
import { apiRoute } from "../../utils/apiSemver";
import { UserService } from "../../services/UserService";
import { Users } from "../../entity/Users";

@Service()
@JsonController(apiRoute(component.USER))
export default class CustomerAdminAuthController {
  constructor(
    private userService: UserService,
    private responseService: ResponseService
  ) {
    this.userService = new UserService();
    this.responseService = new ResponseService();
  }

  @Post(action.ADD)
  public async completeUserOnboarding(
    @Req() req: Request,
    @Body() userData: CreateUser,
    @Res() res: Response
  ) {
    try {
      // Ensure 'role' is set, or provide a default value
      // if (!userData.role) {
      //   userData.role = 'user';  // Assign a default role if not provided
      // }

      // Now the userData will have a 'role' field
      const user = await this.userService.createUser(userData);
      if (user) {
        return this.responseService.success({
          res,
          message: messages.USER.ADD_USER_SUCCESS,
          data: user,
        });
      } else {
        return this.responseService.failure({
          res,
          message: messages.USER.ADD_USER_FAILED,
        });
      }
    } catch (error) {
      return this.responseService.serverError({
        res,
        error,
      });
    }
  }

}