import { UNAUTHORIZED } from "http-status";
import errorMessage from "../errorMessage";

export const user = {
  ADD_USER_ERROR: {
    errorMessage: "User insert failed try again.",
  },
  UPDATE_USER_ERROR: {
    errorMessage: "User update failed try again.",
  },
  DELETE_USER_ERROR: {
    errorMessage: "User delete failed try again.",
  },
  LIST_USER_ERROR: {
    errorMessage: "User get list failed try again.",
  },
  DETAIL_USER_ERROR: {
    errorMessage: "User fetch detail failed try again.",
  },
  USER_NOT_EXIST: {
    errorMessage: "This user does not exist in our system",
  },
  INVALID_USER_ID: {
    errorMessage: "INVALID USER ID NOT EXISTS",
  },
  PHONE_NUMBER_ALREADY_EXISTS: {
    errorMessage: "Entered Phone Number already exists!",
  },

  AUTHORIZEDUSER: {
    errorMessage: "Token error, please login again.",
  },
};
