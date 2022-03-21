exports.getListing = function (req, res) {
  res.status(200).json({
    status: "success",
    message: "get a listing",
  });
};
