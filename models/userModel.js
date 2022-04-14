const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell me your name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: (myemail) => /@columbus.edu\s*$/.test(myemail),
      message: "Please provide your student email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords are not matched",
    },
  },
  passwordChangedAt: Date,
});

// middleware to hash the password before saving the document to the database
userSchema.pre("save", async function (next) {
  // if password is not modified, then return next()
  if (!this.isModified("password")) return next();

  // hash the password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// middleware to update the timestamp for when change password
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || !this.isNew) return next();

  // update timestamp: updating to database is slower than issuing token
  // substract 5000 milisecond for this difference
  this.passwordChangedAt = Date.now() - 5000;
  next();
});

// helper function to check if password is correct
userSchema.methods.isPasswordCorrect = function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

// helper function to check if password has changed after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
