import bcrypt from 'bcrypt';

export const users = [
    {
        name:"Mohamed Riyas",
        email:"riyas@gmail.com",
        password:bcrypt.hashSync("123456",10),
    },
    {
        name:"Coder",
        email:"coder@gmail.com",
        password:bcrypt.hashSync("123456",10),
    },
    {
        name:"Raiyan",
        email:"raiyan@gmail.com",
        password:bcrypt.hashSync("123456",10),
    }
]