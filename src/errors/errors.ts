export function emailAlreadyExistsError(message?: string) {
  return {
    type: "application",
    code: 404,
    message: message || "This email already exists!",
  };
}

export function emailNotExistsError(message?: string) {
  return {
    type: "application",
    code: 404,
    message: message || "This email not exist.",
  };
}

export function invalidPasswordError(message?: string) {
  return {
    type: "application",
    code: 404,
    message: message || "This password is not correct.",
  };
}

export function invalidToken(message?: string) {
  return {
    type: "application",
    code: 409,
    message: message || "This token is invalid.",
  };
}

export function userIdNotExist(message?: string) {
  return {
    type: "application",
    code: 409,
    message: message || "UserId does not exist",
  };
}