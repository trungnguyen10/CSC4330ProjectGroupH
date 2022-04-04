const Axios = require('axios');
function submitForm()
{
  console.log("Submitting the form");
  var datajs = {};
  try
  {
     datajs.email = document.getElementById('email').value;
     datajs.password = document.getElementById('password').value;
  }
  catch
  {}
  console.log(datajs);
  const options = {
    url: 'http://localhost:3000/api/login',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      email: datajs.email,
      password: datajs.password
    }
  };
  axios(options)
  .then(response => {
    console.log(response.status);
  }); 

}

document.addEventListener('DOMContentLoaded', function(){
    // do something
  var btn = document.getElementById('submit');

// attach anonymous function to click event
btn.addEventListener('click', submitForm);
});