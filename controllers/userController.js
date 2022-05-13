const User = require(`${__dirname}/../models/userModel`);
const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const AppError = require(`${__dirname}/../utils/appError`);

exports.getUser = catchAsync(async function (req, res, next) {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("User does not exist!", 404));
  res.status(200).json({
    status: "success",
    data: user,
  });
});
