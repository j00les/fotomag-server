const handleErrors = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";
  console.log(err, "ini errro");

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
  } else if (err.name === "Forbiden") {
    code = 403;
    message = "You are not authorized";
  } else if (err.name === "Your balance is less") {
    (code = 400), (message = "Your balance is less");
  } else if (err.name === "Nominal is required") {
    (code = 400), (message = "Nominal is required");
  } else if (err.name === "This is not your transaction") {
    (code = 401), (message = "This is not your transaction");
  } else if (err.name === "This is not your jurisdiction") {
    (code = 401), (message = "This is not your jurisdiction");
  } else if (err.name === "Transaction not found") {
    (code = 404), (message = "Transaction not found");
  } else if (err.name === "Toko not found") {
    (code = 404), (message = "Toko not found");
  } else if (err.name === "Email must be Unique") {
    (code = 400), (message = "Email must be Unique");
  } else if (err.name === "Courier not found") {
    (code = 404), (message = "Driver not found");
  }

  res.status(code).json({
    message: message,
  });
};

module.exports = handleErrors;
