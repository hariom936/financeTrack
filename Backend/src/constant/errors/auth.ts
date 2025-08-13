export const auth = {
  TOKEN_EXPIRED: {
    errorMessage: 'You login session has expired',
    FTA: 'Finance_01003'
  },
  INVALID_TOKEN: {
    errorMessage: 'Invalid Login Token. Please login again',
    FTA: 'Finance_01004'
  },
  AUTHORIZATION_ERROR: {
    errorMessage: "You don't have access to this section. Please reach out to your system administrator to get the access.",
    FTA: 'Finance_01005'
  },
  SESSION_EXPIRE_TIME:{
    errorMessage: "Your session has been expired. Please log in again.",
    FTA: 'Finance_01006'
  },
  SESSION_FORCE_LOGOUT:{
    errorMessage: "Your role has been updated. Please log in again.",
    FTA: 'Finance_01007'
  },
  TOKEN_NOT_PROVIDED:{
    errorMessage: "Token is not provided ",
    FTA: null

  }
};
