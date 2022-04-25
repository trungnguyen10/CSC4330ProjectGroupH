const signup = async (name,email,password,passwordConfirm) => {
  try {
    const result = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/user/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (result.data.status === "success") {
      alert("Successful signup");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response);
    alert("One of the fields was invalid. Please check both passwords are the same and email is correct.");
    }
};


document.querySelector(".signup").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;
  signup(name,email,password,passwordConfirm);
});
