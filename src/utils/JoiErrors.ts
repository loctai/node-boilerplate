export const TEXT = {
  ERRORS: {
    requiredField: (requiredValue: string) =>
      `Field "${requiredValue}" is required`,

    userDoesntExists: "User not found",
    somethingWentWrong: "Something went wrong",
    incorrectEmailFormat: "Wrong email format",
    userExists: "User already exists",
    roleExists: "This role already exists",
    wrongCredentials: "Sorry, credentials are wrong",
    wrongOldPassword: "Sorry, old password are wrong",
    incorrectPasswordFormat: "Incorrect password format",
    postExists: "Post with the same url already exists",
    postDoesntExists: "Post not found",
    emailExists: "Email already saved",
    wrongTypeUrl:
      "Url should contain only small latin letters, numbers, hyphens and underscores",
    duplicateTitle: "Post with the same title already exists",
  },
};
export const JOI_ERRORS = {
  "string.email": "Wrong email format",
  "any.required": "Field {{#label}} is required",
};
