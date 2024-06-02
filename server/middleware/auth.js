const ErrorHandler = require("../erroHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const bcrypt = require("bcryptjs");

// Middleware function to check secret_token header and perform authentication
exports.checkAuth = catchAsyncErrors((req, res, next) => {
  const secret = req.header("secret_token");

  if (!secret) {
    return next(new ErrorHandler("Request Not Allowed", 401));
  }

  // Compare the secret_token with the stored browser key using bcrypt
  const authorized = bcrypt.compareSync(process.env.BROWSER_KEY, secret);
  if (!authorized) {
    return next(
      new ErrorHandler("Trying to get unauthorized access to this route!", 401)
    );
  }

  next();
});
