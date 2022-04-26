

const getUser = () => {
    axios.get("http://127.0.0.1:3000/api/v1/user/")
    .then((user) => {
        const data = user.data;
        console.log("User data recieved", data);
    }).catch(() =>{
        alert('Error retrieving data');
    });
    

}

// pug.render();
getUser(); 

// console.log(compiledFunction({
//     data
// }))

// 


// res.render("userinfo", (req,res) => {

// )};