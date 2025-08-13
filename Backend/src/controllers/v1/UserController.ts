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
  Put,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { ResponseService } from "../../services/ResponseService";
import {
  CreateUser,
  LoginUser,
  UpdateUser,
  UserId,
  UserListing,
} from "../../validations/UserValidation";
import messages from "../../constant/messages";
import { action, component } from "../../constant/api";
import { query, Request, Response } from "express";
import { apiRoute } from "../../utils/apiSemver";
import { UserService } from "../../services/UserService";
import { Users } from "../../entity/Users";
import { ApiError } from "../../utils/Apierror";

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

  // src/controllers/UserController.ts

  //Add New User

  @Post(action.ADD)
  public async completeUserOnboarding(
    @Req() req: Request,
    @Body() userData: CreateUser,
    @Res() res: Response
  ) {
    try {
      const user = await this.userService.createUser(userData);
      return this.responseService.success({
        res,
        message: messages.USER.ADD_USER_SUCCESS,
        data: user,
      });
    } catch (error) {

      // Handle other unexpected errors
      return this.responseService.serverError({
        res,
        error,
      });
    }
  }

  //Get User Listing
  @Get(action.LIST)
  public async getListing(
    @Req() req: Request,
    @QueryParams() query: UserListing,
    @Res() res: Response
  ) {
    try {
      const fetchData = await this.userService.fetchData(query);
      if (fetchData) {
        return this.responseService.success({
          res,
          message: messages.SUCCESS,
          data: fetchData,
        });
      } else {
        return this.responseService.noDataFound({
          res,
          message: messages.NOT_FOUND,
        });
      }
    } catch (error) {
      return this.responseService.serverError({
        res,
        error,
      });
    }
  }

  @Get(action.DETAIL)
  public async getUserDetails(
    @Req() req: Request,
    @QueryParams() query: UserId,
    @Res() res: Response
  ) {
    try {
      const fetchData = await this.userService.fetchDetails(query);
      if (fetchData) {
        return this.responseService.success({
          res,
          message: messages.SUCCESS,
          data: fetchData,
        });
      } else {
        return this.responseService.noDataFound({
          res,
          message: messages.NOT_FOUND,
        });
      }
    } catch (error) {
      return this.responseService.serverError({
        res,
        error,
      });
    }
  }

  //Update User
  @Put(action.UPDATE)
  public async updateUser(
    @Req() req: Request,
    @QueryParams() query: UserId,
    @Body() body: any, // 👈 Add this line to get data from the request body
    @Res() res: Response
  ) {
    try {
      // Pass both the body and the query to the service method
      const fetchData = await this.userService.updateUsers(body, query); // 👈 Correctly pass two arguments

      if (fetchData) {
        return this.responseService.success({
          res,
          message: messages.SUCCESS,
          data: fetchData,
        });
      } else {
        return this.responseService.noDataFound({
          res,
          message: messages.NOT_FOUND,
        });
      }
    } catch (error) {
      return this.responseService.serverError({
        res,
        error,
      });
    }
  }

  //Delete User
  @Delete(action.DELETE)
public async deleteUser(
  @Res() res: Response,
  @QueryParam('userId') userId: number,
  @Req() req: Request
) {
  try {
    console.log('Deleting user with ID:', userId); // add this to confirm

    await this.userService.deleteUser(userId);

    return this.responseService.success({
      res,
      message: 'User deleted successfully',
    });
  } catch (error) {
    return this.responseService.serverError({
      res,
      error: error.message,
    });
  }
}

// src/controllers/AuthController.ts

@Post(action.LOGIN)
public async loginUser(
  @Body({ validate: true }) user: LoginUser,
  @Res() res: Response
) {
  try {
    const result = await this.userService.loginUser(user);

    return res.status(200).json({
      message: 'Login successful!',
      responseCode: 200,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Login user failed!',
      responseCode: 400,
      error: error.message,
    });
  }
}




}