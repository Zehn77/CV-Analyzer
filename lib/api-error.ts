const REGISTER_ERROR_MESSAGES: Record<number, string> = {
  400: "Invalid data provided",
  403: "Admin registration is not allowed",
  409: "An account with this email already exists",
  422: "Invalid data provided",
  429: "Too many attempts. Please try again later",
  500: "Server error. Please try again later",
};

const AUTH_ERROR_MESSAGES: Record<number, string> = {
  400: "Invalid email or password format",
  401: "Incorrect email or password",
  403: "Access to this account is forbidden",
  404: "No account found with this email",
  422: "Invalid data provided",
  429: "Too many attempts. Please try again later",
  500: "Server error. Please try again later",
};

const FALLBACK_MESSAGE = "Something went wrong. Please try again later";

export function getRegisterErrorMessage(status?: number): string {
  if (!status) return FALLBACK_MESSAGE;
  return REGISTER_ERROR_MESSAGES[status] ?? FALLBACK_MESSAGE;
}

export function getAuthErrorMessage(status?: number): string {
  if (!status) return FALLBACK_MESSAGE;
  return AUTH_ERROR_MESSAGES[status] ?? FALLBACK_MESSAGE;
}
