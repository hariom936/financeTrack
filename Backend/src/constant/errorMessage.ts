import { user } from "./errors/user";
import { auth } from "./errors/auth";
import { validation } from './errors/validation';
export default {
  getErrorConstantByURL: {
    "user/action/add": {
      MODULE: "user",
      SUBMODULE: "ADD_USER_ERROR",
    },
    "user/action/update": {
      MODULE: "user",
      SUBMODULE: "UPDATE_USER_ERROR",
    },
    "user/action/list": {
      MODULE: "user",
      SUBMODULE: "LIST_USER_ERROR",
    },
    "user/action/delete": {
      MODULE: "user",
      SUBMODULE: "DELETE_USER_ERROR",
    },
    "user/action/detail": {
      MODULE: "user",
      SUBMODULE: "DETAIL_USER_ERROR",
    },
    "user/action/updateUserStatus": {
      MODULE: "user",
      SUBMODULE: "STATUS_USER_ERROR",
    },
    "user/action/login_ERROR": {
      MODULE: "user",
      SUBMODULE: "LOGIN_USER_ERROR",
    }
  },
  user,
  auth,
  validation,
};
