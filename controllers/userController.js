const User = require(`${__dirname}/../models/userModel`);
const catchAsync = require(`${__dirname}/../utils/catchAsync`);

exports.getUser = catchAsync(async function (req, res) {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    status: "success",
    data: user,
  });
});
