import mongoose from "mongoose";

export const connectdb = async () => {
    await mongoose.connect('mongodb+srv://mauryarishu211:20135111@cluster0.nds8w.mongodb.net/food-del').then(() => {
        console.log("DB Connected");
    })
    // await mongoose.connect('postgres://postgres.apbkobhfnmcqqzqeeqss:Rishu20135111@@aws-0-[REGION].pooler.supabase.com:6543/postgres').then(() => {
    //     console.log("DB Connected");
}
