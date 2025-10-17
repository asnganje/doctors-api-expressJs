import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error caught by middleware:", err.message);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
