const bcrypt =require("bcryptjs")

const users = [
    {
        name:"Admin User",
        email:"admin@gmail.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:"true"
    },
    {
        name:"John ",
        email:"john@gmail.com",
        password:bcrypt.hashSync("123456",10)
  
    },
    {
        name:"Robert",
        email:"robert@gmail.com",
        password:bcrypt.hashSync("123456",10)
       
    },
    
]


module.exports=users