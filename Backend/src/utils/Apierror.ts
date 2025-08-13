import { HttpError } from 'routing-controllers';

export class ApiError extends HttpError {
  errorCode?: string | undefined;
    FTA: string | undefined;
  constructor(status: number, message?: string, FTA?: string) {
    super(status, message);
    this.errorCode = FTA;
  }
}
