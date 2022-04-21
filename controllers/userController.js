const User = require(`${__dirname}/../models/userModel`);

exports.getUser = async function (req, res) {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    status: "success",
    data: user,
  });
};
