import { connectDB } from "./src/config/db.js";
import { users } from "./src/data/users.js";
import { asyncHandler } from "./src/middleware/asyncHandler.js";
import { User } from "./src/model/userSchema.js";
import dotenv from 'dotenv';

dotenv.config({ path: "backend/.env" });

connectDB();

const destroyData = asyncHandler(async()=>{

    await User.deleteMany();

    console.log(`User datas from DB are deleted`);
    process.exit();
});

const importData = asyncHandler(async()=>{

    await User.deleteMany();
    await User.insertMany(users);

    console.log(`User datas from DB are deleted`);
    process.exit();
});

if( process.argv[2] === "-d" ){
    destroyData();
}
else{
    importData()
}