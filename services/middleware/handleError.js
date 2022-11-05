const handleErrors = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });
  } else if (err.name === "Invalid email/password") {
    code = 401;
    message = "Invalid email/password";
  } else if (err.name === "Invalid access_token") {
    code = 401;
    message = "Unauthorized";
  } else if (err.name === "Password is required") {
    code = 400;
    message = "Password is required";
  } else if (err.name === "Email is required") {
    code = 400;
    message = "Email is required";
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  } else if (err.name === "Forbidden") {
    code = 403;
    message = "You are not authorized";
  } else if (err.name === "Phone Number is required") {
    (code = 400), (message = "Phone Number is required");
  } else if (err.name === "Invalid phoneNumber") {
    (code = 400), (message = "Invalid phoneNumber");
  } else if (err.name === "Your balance is less") {
    (code = 400), (message = "Your balance is less");
  }
  res.status(code).json({
    message: message,
  });
};

module.exports = handleErrors;
