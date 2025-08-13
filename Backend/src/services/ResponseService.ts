import httpStatus from 'http-status';
import { ApiError } from '../utils/Apierror';
import logger from '../utils/logger';
import { Response } from 'express';
import { Anything } from '../types/json';
import { HttpError } from 'routing-controllers';
import config from '../config/config';
import { Service } from 'typedi';
import errorMessages from '../constant/errorMessage';
import path from 'path';
import { promisify } from 'util';

interface sucessOptions {
  res: Response;
  message?: string;
  data?: Anything;
  status?: number;
}

interface failureOptions {
  res: Response;
  message?: string;
  status?: number;
  FTA?: string;
}

interface serverErrorOptions {
  res: Response;
  message?: string | string[];
  status?: number;
  FTA?: string;
  error: Error | ApiError | null | undefined | unknown;
}

interface validationErrorOptions {
  res: Response;
  message?: string;
  FTA?: string;
  status?: number;
  errors?: undefined | any[];
}

interface noDataFoundOptions {
  res: Response;
  message: string;
  data?: string | string[];
  status?: number;
  FTA?: string;
}

@Service()
export class ResponseService {
  public devMode = config.showErrorStack;

  /* Success 2xx */
  /**
   * Sends a success message with optional message (OK default) data (null default) and status (200 default)
   * @param {sucessOptions} opts
   * @returns
   */
  public success(opts: sucessOptions) {
    const { res, message = httpStatus['200_NAME'], data = null, status = httpStatus.OK } = opts;
    return res.status(status).json({
      message,
      responseCode: status,
      data,
      error: null
    });
  }




  
  /**
   * Send a validation error message 422 code, with message , status and response
   * @param opts
   * @returns
   */
  public validationError(opts: validationErrorOptions) {
    const {
      res,
      message = httpStatus['422_NAME'],
      status = httpStatus.UNPROCESSABLE_ENTITY,
      FTA,
      errors = undefined
    } = opts;
    return res.status(status).json({
      message,
      FTA,
      errors,
      responseCode: status
    });
  }

  /* Client Failure 4xx */
  /**
   * Sends a client failure response with optional message (Bad Request default) and status (400 default)
   * @param {failureOptions} opts
   * @returns
   */
  failure(opts: failureOptions) {
    const {
      res,
      message = httpStatus['400_NAME'],
      status = httpStatus.BAD_REQUEST,
      FTA
    } = opts;
    return res.status(status).json({
      message,
      responseCode: status,
      FTA
    });
  }
  Unauthorized(opts: failureOptions) {
    const {
      res,
      message = httpStatus['401_NAME'],
      status = httpStatus.UNAUTHORIZED,
      FTA
    } = opts;
    return res.status(status).json({
      message,
      responseCode: status,
      FTA
    });
  }

  noDataFound(opts: noDataFoundOptions) {
    const {
      res,
      message = httpStatus['201_NAME'],
      status = httpStatus.NOT_FOUND,
      FTA
    } = opts;
    return res.status(status).json({
      message,
      FTA,
      responseCode: status,
      error: null
    });
  }

  async sendFile(opts) {
    const { res, rootPath } = opts;
    const absolutePath = path.resolve(rootPath);
    await promisify<string, void>(res.sendFile.bind(res))(absolutePath);
    return res;
  }

  /* Server Error 5xx */
  /**
   * Sends a server error with optional message (Internal Server Error Default)
   * and status (500 default)
   * @param {serverErrorOptions} opts
   * @returns
   */
  serverError(opts: serverErrorOptions) {
    const {
      res,
      message = httpStatus['500_NAME'],
      status = httpStatus.INTERNAL_SERVER_ERROR,
      FTA,
      error
    } = opts;
    let responseStatus = status;
    let responseMessage = message;
    let responseCode: string | number | undefined = status;
    let data;
    let responseFTA = FTA;
    if (error instanceof ApiError) {
      responseStatus = error.httpCode;
      responseCode = error.httpCode;
      responseMessage = error.message;
      responseFTA = error.FTA;
    }
    if (error instanceof HttpError) {
      responseStatus = error.httpCode;
      responseCode = error.httpCode;
      responseMessage = error.message;
      if (responseStatus === httpStatus.UNPROCESSABLE_ENTITY) {
        data = [error.message];
        responseMessage = errorMessages.validation.INVALID_DATA.errorMessage;
      }
      // We're returning blitz code as well!
      responseFTA = error['FTA'];
    }
    status >= 500 && logger.error(error);
    return res.status(responseStatus).json({
      message: responseMessage,
      data,
      error: this.devMode ? error instanceof Error && error.stack : null,
      responseCode: responseCode,
      FTA: responseFTA
    });
  }
}
