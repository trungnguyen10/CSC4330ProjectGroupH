

const login = async (email, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/user/login",
      data: {
        email,
        password,
      },
    });

    if (result.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/homepage");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
