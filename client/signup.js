const axios = require('axios').default;
function submitForm()
{
  console.log("Submitting the form");
  var datajs = {};
  try
  {
     datajs.first = document.getElementById('First').value;
     datajs.last = document.getElementById('Last').value;
     datajs.email = document.getElementById('email').value;
     datajs.password = document.getElementById('password').value;
     datajs.confirm = document.getElementById('confirm').value;
  }

  

  catch
  {}
  console.log(datajs);
  if(datajs.password !== datajs.confirm)
  {
    alert("Password does not match");
  }
  const options = {
    url: 'localhost:3000/api/user/login',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      first: datajs.first,
      last: datajs.last,
      email: datajs.email,
      password: datajs.password,
      confirm: datajs.confirm
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
