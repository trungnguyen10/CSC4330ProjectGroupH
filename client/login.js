// // const Axios = require('axios');
// function submitForm() {
//   console.log("Submitting the form");
//   var datajs = {};
//   try {
//     datajs.email = document.getElementById("email").value;
//     datajs.password = document.getElementById("password").value;
//   } catch {}
//   console.log(datajs);
//   const options = {
//     url: "http://127.0.0.1:3000/api/user/login",
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     data: {
//       email: datajs.email,
//       password: datajs.password,
//     },
//   };
//   axios(options).then((response) => {
//     console.log(response.status);
//   });
// }

// document.addEventListener("DOMContentLoaded", function () {
//   // do something
//   var btn = document.getElementById("submit");

//   // attach anonymous function to click event
//   btn.addEventListener("click", submitForm);
// });

const login = async (email, password) => {
  console.log(email, password);
  const result = await axios({
    method: "POST",
    url: "http://127.0.0.1:3000/api/v1/user/login",
    data: {
      email,
      password,
    },
  });
  console.log(result);
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
