import mongoose from "mongoose";

 export const connectDB  = async () => {
    await mongoose.connect('mongodb+srv://Greatstack:975312468@cluster0.qxemfim.mongodb.net/food-delf') .then(() => console.log("DB Connected"));
}
