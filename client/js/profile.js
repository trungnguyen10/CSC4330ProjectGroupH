// const editListing = async(title, price, tag, id) => {
//     var title = document.getElementById("title").value;
//     var price = document.getElementById("price").value;
//     var tag = document.getElementById("tag").value;
//     console.log(title,price,tag,id);
//     axios.patch(`http://127.0.0.1:3000/api/v1/listing/`,{"_id": id, "title" : title, "price" : price, "tag" : tag}).then(repsonse => {
//         console.log(reponse);
//     })
// }


// const getUser = () => {
//     axios.get("http://127.0.0.1:3000/api/v1/user/")
//     .then((user) => {
//         const data = user.data;
//         console.log("User data recieved", data);
//     }).catch(() =>{
//         alert('Error retrieving data');
//     });



    


// const deleteListing = async(id) => {
//     axios.delete("http://127.0.0.1:3000/api/v1/listing/", {params: { _id : id}}).then(repoonse => {
//     console.log(reponse);
//     })
// }

//  var bored =  document.querySelector("Edit").addEventListener("Edit", (e) => {
//      if(bored){
//         e.preventDefault();
//         alert("Hello World!");
//      }
    
//    });

   

//   document.getElementById("Edit").onclick = function() {
//     alert("Hello World!");
// }
// pug.render();


// console.log(compiledFunction({
//     data
// }))

// 


// res.render("userinfo", (req,res) => {

// )};