


const getUser = () => {
    axios.get("http://127.0.0.1:3000/api/v1/user/")
    .then((user) => {
        const data = user.data;
        console.log("User data recieved", data);
    }).catch(() =>{
        alert('Error retrieving data');
    });
    

}
resizeBy.render
// pug.render();

router.get("/profile",(req,res)=> {
    res.render("profile", {
        user: req.user
    });
})
getUser(); 
// console.log(compiledFunction({
//     data
// }))

// 


// res.render("userinfo", (req,res) => {

// )};